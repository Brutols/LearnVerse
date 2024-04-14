const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const PORT = 3030
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URL)

const db = mongoose.connection

db.on("error", console.error.bind(console, "db connection error!"))
db.once("open", () => {
    console.log("db successfully connected!")
})

app.listen(PORT, () => {
    console.log(`server connected and listening on port: ${PORT}`)
})