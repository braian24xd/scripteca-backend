const Recording = require('../models/Recording'); // Modelo de grabaciones

// Obtener todas las grabaciones
const getRecordings = async (req, res) => {
    try {
        const recordings = await Recording.find(); // Obtiene todas las grabaciones de la colección
        res.status(200).json(recordings);
    } catch (error) {
        console.error('Error al obtener grabaciones:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const addRecording = async (req, res) => {
    try {
        const { title, description, url, date } = req.body;

        // Validar que los campos necesarios estén presentes
        if (!title || !url || !date) {
            return res.status(400).json({ message: 'El título, la fecha y la URL son obligatorios.' });
        }

        // Crear una nueva grabación
        const newRecording = new Recording({
            title,
            description,
            url,
            date: new Date(date), // Convertir la fecha a formato Date
        });

        // Guardar en la base de datos
        const savedRecording = await newRecording.save();

        res.status(201).json(savedRecording);
    } catch (error) {
        console.error('Error al agregar grabación:', error);
        res.status(500).json({ message: 'Error al agregar la grabación' });
    }
};

const updateRecording = async (req, res) => {
    const { id } = req.params; // Obtener el ID desde los parámetros de la URL
    const { title, description } = req.body; // Obtener los datos enviados en la solicitud

    try {
        const updatedRecording = await Recording.findByIdAndUpdate(
            id,
            { title, description }, // Campos a actualizar
            { new: true } // Retorna el documento actualizado
        );

        if (!updatedRecording) {
            return res.status(404).json({ message: 'Grabación no encontrada' });
        }

        res.status(200).json(updatedRecording); // Retorna la grabación actualizada
    } catch (error) {
        console.error('Error al actualizar grabación:', error);
        res.status(500).json({ message: 'Error al actualizar la grabación' });
    }
};

const deleteRecording = async (req, res) => {
    const { id } = req.params;

    try {
        const recording = await Recording.findByIdAndDelete(id);

        if (!recording) {
            return res.status(404).json({ message: 'Grabación no encontrada' });
        }

        res.status(200).json({ message: 'Grabación eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la grabación:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = {
    getRecordings,
    addRecording,
    updateRecording,
    deleteRecording,
};