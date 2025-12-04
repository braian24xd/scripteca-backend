import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/authRoutes.js'
import recordingsRoutes from './routes/recordingsRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import preregisterRoutes from './routes/preregisterRoutes.js'
import courseRouter from './routes/courseRouter.js'
import moduleRouter from './routes/moduleRouter.js'
import paymentRouter from './routes/paymentRouter.js'

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://www.scripteca.com",
  "https://scripteca.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

app.use('/api', authRoutes);
app.use('/api/recordings', recordingsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/preregister', preregisterRoutes)
app.use('/api/courses', courseRouter)
app.use('/api/modules', moduleRouter)
app.use('/api/payments', paymentRouter)

app.get('/', (req, res) => {
  res.send('Punto de inicio, si tiene acceso, autentiquese. De lo contrario solcite un acceso contacto@scripteca.com');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));