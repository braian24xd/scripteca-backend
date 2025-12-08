import mongoose from 'mongoose';

const recordingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    date: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Recording', recordingSchema);