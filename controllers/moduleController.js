import Module from '../models/Module.js'

const getModules = async (req, res) => {
    try {
        const modules = await Module.find()
        return res.status(200).json({ data: modules })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error interno, intenta de nuevo más tarde" })
    }
}

const createModule = async(req, res) => {
    const { title, description, duration, tags, isfree, requirePrevModule } = req.body

    try {

        const existingModule = await Module.findOne({ title })
        if (existingModule) {
            return res.status(400).json({ message: "El modulo ya existe" })
        }

        const newModule = new Module({
            title,
            description,
            duration,
            tags,
            isfree,
            requirePrevModule
        })

        await newModule.save()
        return res.status(201).json({ message: `El modulo ${title}, ha sido creado correctamente`})

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Error interno, intenta de nuevo más tarde" })
    }
}

export {
    getModules,
    createModule
}