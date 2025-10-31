import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string
const PORT = process.env.PORT || '3000'
const DATABASE_URL = process.env.DATABASE_URL

export { JWT_SECRET, PORT, DATABASE_URL }