import mongoose from 'mongoose'

const PaymentSchema = new mongoose.Schema({
    paymentId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId, ref: "Course",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: "MXN"
    },
    status: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending"
    },
    gateway: {
        type: String,
        enum: ["stripe", "mercadopago"],
        required: true
    },
    rawResponse: {
        type: Object
    },
    webhookStatus: {
        type: String,
        enum: ["received", "not_received"],
        default: "not_received"
    }
},
{ timestamps: true })

export default mongoose.Model('Payment', PaymentSchema)