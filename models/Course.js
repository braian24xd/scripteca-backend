import mongoose from 'mongoose'
import slugify from 'slugify'

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
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
    level: {
        type: String,
        enum: ["Principiantes", "Intermedio", "Avanzado"],
        default: "Principiantes",
        index: true
    },
    slug: {
        type: String,
        unique: true,
        index: true
    },
    modules: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Module",
            index: true
        }
    ],
    isActive: {
        type: Boolean,
        required: true,
        index: true
    },
}, { timestamps: true })

CourseSchema.pre("save", function (next) {
    if (!this.slug) {
        this.slug = slugify(this.title, {
            replacement: "-",
            lower: true
        })
    }
    next()
})

export default mongoose.model('Course', CourseSchema)