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
    status: [
        {
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
            date: Date
        }
    ],
    progress: [
        {
            overallPercentage: {
                type: Number,
                default: 0,
                required: true
            }
            
        }
    ]
})

export default mongoose.model("Enrollment", EnrollmentSchema)