import Course from "../models/Course.js";

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find()
        return res.status(200).json({ data: courses })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Error del servidor" + error })
    }
}

const createCourse = async (req, res) => {
    const { title, description, price, thumbnail, duration, level, modules, isActive } = req.body

    try {
        const existingCourse = await Course.findOne({ title })

        if (existingCourse) {
            return res.status(400).json({ message: "El curso ya existe" })
        }

        const newCourse = new Course({
            title,
            description,
            price,
            thumbnail,
            duration,
            level,
            modules,
            isActive
        })

        await newCourse.save()

        return res.status(201).json({ message: `El curso ${title}, ha sido creado correctamente` })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Error interno, intenta de nuevo más tarde" })
    }
}

export {
    getCourses,
    createCourse
}