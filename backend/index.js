require('dotenv').config();
const express = require("express");
const userModel = require('./models/User.model.js')
const userRouter = require('./routes/user.route.js')
const accountRouter = require('./routes/account.route.js')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.use('api/v1/',userRouter )

app.use('api/v1', accountRouter)

const PORT = 3000
app.listen(PORT, (err)=> {
    console.error(`http://localhost:${PORT}`)
})
