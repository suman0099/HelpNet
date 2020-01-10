const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const morgan = require("morgan");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
//const helpRouter = require("./routes/helpRoutes");
const errorHandler = require("./controllers/error");
const { loginRequired, ensureCorrectUser } = require("./middlewares/auth");
const keys = require("./config/keys");
require("./services/passport");

mongoose
    .connect("mongodb://localhost:27017/helpnet")
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => console.log(err));

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/api/auth", authRouter);
app.use("/api/users/:id", loginRequired, ensureCorrectUser, userRouter);
//app.use("/api/helps", helpRouter);

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
