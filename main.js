const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./swagger/swagger")
require("dotenv").config()

const coursesRoute = require("./routes/coursesRoute");
const lessonsOrderRoute = require("./routes/lessonsOrderRoute");
const lessonsRoute = require("./routes/lessonsRoute");
const usersRoute = require("./routes/usersRoute");
const loginRoute = require("./routes/loginRoute");

const PORT = 3030
const app = express()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", coursesRoute);
app.use("/", lessonsOrderRoute);
app.use("/", lessonsRoute);
app.use("/", usersRoute);
app.use("/", loginRoute);

mongoose.connect(process.env.MONGODB_URL)

const db = mongoose.connection

db.on("error", console.error.bind(console, "db connection error!"))
db.once("open", () => {
    console.log("db successfully connected!")
})

app.listen(PORT, () => {
    console.log(`server connected and listening on port: ${PORT}`)
})