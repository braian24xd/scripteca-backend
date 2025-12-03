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
        index: true
    },
    statusHistory: {
        type: [
            {
                status: {
                    type: String,
                    enum: ["active", "pending", "paused", "expired", "refunded", "cancelled", "banned"]
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        default: []
    },
    progress: {
        overallPercentage: {
            type: Number,
            default: 0,
        },
        // modulesProgress: 

    }
}, { timestamps: true })

EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true })

export default mongoose.model('Enrollment', EnrollmentSchema)