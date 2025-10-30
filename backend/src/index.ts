import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import urlRoutes from './routes/url.router'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/api/urls', urlRoutes)

app.get('/', (_, res) => res.send('Short URL backend is running'))

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})