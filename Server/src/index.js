import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './config/DbConnection.js'
import UserRouter from './routes/user.roate.js'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 4328


//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions))

// Database connection
connectDB()


// Routes
app.use('api/v1/user', UserRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
})
