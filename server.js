// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const recordingsRoutes = require('./routes/recordingsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const preregisterRoutes = require('./routes/preregisterRoutes.js');
import courseRouter from './routes/courseRouter.js';

// Configuración de entorno
dotenv.config();

const app = express();

const allowedOrigins = [
  "https://www.scripteca.com",
  "https://scripteca.com",
  "http://localhost:5173", // opcional para pruebas locales
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Conexión a la base de datos
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/api', authRoutes);
app.use('/api/recordings', recordingsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/preregister', preregisterRoutes)
app.use('/api/course', courseRouter)

// Ruta principal
app.get('/', (req, res) => {
  res.send('Bienvenido al Backend Compartido');
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));