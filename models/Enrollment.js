import mongoose from 'mongoose'

const EnrollmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        index: true
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        index: true
    },
    status: {
            type: String,
            enum: ["active", "pending", "paused", "expired", "refunded", "cancelled", "banned"],
            /*
                active: acceso normal,
                pending: pagó pero se esta esperando respuesta del webhook,
                pause: falta pago en suscripcion,
                expired: termino la membresia,
                refunded: se devolvió el pago,
                cancelled:  cancelacion de membresia,
                banned: acceso revocado
            */
            default: "pending",
            index: true,
            statusHistory: [
                {
                    status: {
                        type: String,
                    },
                    date: {
                        type: Date,
                        default: Date.now()
                    }
                }
            ]
    },
    progress: [
        {
            overallPercentage: {
                type: Number,
                default: 0,
                required: true
            },
            modulesProgress: [
                {
                    moduleId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Recording"
                    },
                    completed: {
                        type: Boolean,
                        required: true,
                        default: true
                    },
                    completedAt: {
                        type: Date.now(),
                        default: null
                    },
                    videosCompleted: [
                        {
                            type: [mongoose.Schema.Types.ObjectId]
                        }
                    ],
                    evaluationScore: {
                        type: Number,
                        default: 0
                    },
                    projectStatus: {
                        type: String,
                        enum: ["pending", "submitted", "approved", "rejected"],
                        default: "pending"
                    }
                }
            ]
        }
    ]
}, { timestamps: true })

export default mongoose.model("Enrollment", EnrollmentSchema)