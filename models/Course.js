import mongoose from 'mongoose'

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "Sin descripcion"
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        default: 0
    },
    modules: [
        {
            module: {
                type: mongoose.Schema.Types.ObjectId, ref: "Module"
            }
        }
    ],
    isActive: {
        type: Boolean,
        required: true
    }
})

export default mongoose.Model('Course', CourseSchema)