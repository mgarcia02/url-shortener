import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.router'
import urlRoutes from './routes/url.router'
import userRoutes from './routes/user.router'
import cookieParser from 'cookie-parser'
import { PORT } from './config' 
import errorHandler from './middlewares/errorHandler'

const app = express()

// Middleware para parsear cuerpos JSON en las peticiones
app.use(express.json())
// Middleware para manejar cookies en las peticiones/respuestas
app.use(cookieParser())

// Configuración de CORS para permitir comunicación con el frontend
app.use(cors({
  origin: 'http://localhost:5173', // frontend
  credentials: true,                // Habilita el intercambio de cookies y otros datos de autenticación
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}))

// Rutas principales de la API
app.use('/api/auth', authRoutes)
app.use('/api/urls', urlRoutes)
app.use('/api/users', userRoutes)

// Middleware global de manejo de errores
app.use(errorHandler)

app.get('/', (_, res) => res.send('Short URL backend is running'))

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})