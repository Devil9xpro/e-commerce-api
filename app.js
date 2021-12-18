require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
//logging
const morgan = require('morgan')

//database connect
const connectDB = require('./db/connect')

//router
const authRouter = require('./routes/authRoute')

//middleware
const notFoundMiddleware = require('./middleware/not-found')
const erroHandlerMiddleware = require('./middleware/error-handler')

app.disable('etag')
app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('e-commerce api')
})

app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware)
app.use(erroHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()