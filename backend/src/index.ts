import express from 'express'
import cors from 'cors'
import urlRoutes from './routes/url.router'
import userRoutes from './routes/user.router'
import cookieParser from 'cookie-parser'
import { PORT } from './config' 

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:5173', // frontend
  credentials: true                // Habilita el intercambio de cookies y otros datos de autenticación
}))

app.use('/api/urls', urlRoutes)
app.use('/api/users', userRoutes)

app.get('/', (_, res) => res.send('Short URL backend is running'))

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})