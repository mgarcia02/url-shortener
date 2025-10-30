import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import urlRoutes from './routes/url.router'
import userRoutes from './routes/user.router'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/api/urls', urlRoutes)
app.use('/api/users', userRoutes)

app.get('/', (_, res) => res.send('Short URL backend is running'))

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})