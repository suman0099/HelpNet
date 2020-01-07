const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRouter = require("./routes/authRoutes");
const errorHandler = require("./handlers/error");

mongoose
    .connect("mongodb://localhost:27017/helpnet")
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use("/api/auth", authRouter);

//404 Error
app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
