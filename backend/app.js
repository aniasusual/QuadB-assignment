const express = require("express");
const errorMiddleware = require("./middleware/error");
const userRouter = require("./routes/userRoute");

const app = express();
app.use(express.json());

// app.use("api/v1/", dataRouter)
app.use("/api/v1", userRouter)

app.use(errorMiddleware);

module.exports = app;