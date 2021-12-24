require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const usersRouter = require('./controllers/users')


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use('/api/register', usersRouter)

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})