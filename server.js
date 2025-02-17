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

// Configuración de entorno
dotenv.config();

const app = express();



// Middlewares
app.use(cors());
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

// Ruta principal
app.get('/', (req, res) => {
  res.send('Bienvenido al Backend Compartido');
});

// Sirve el build de React en producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Para cualquier ruta no definida, se devuelve el index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));