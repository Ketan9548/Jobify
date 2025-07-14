import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './config/DbConnection.js'
import UserRouter from './routes/user.js'
import CompanyRouter from './routes/Company.js'
import 'dotenv/config'
const app = express()
const PORT = process.env.PORT || 4328


//middleware
// express.json is use for json data
app.use(express.json())
// express.urlencoded is use for urlencoded data
app.use(express.urlencoded({ extended: true }))
// cookie parser
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
app.use('/api/user', UserRouter)
app.use('/api/company', CompanyRouter)

app.get('/', (req, res) => {
    res.send('Hello Jobify!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
})
