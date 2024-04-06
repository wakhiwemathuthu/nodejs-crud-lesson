const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const signUpRouter = require("./routes/signup");
const signInRouter = require("./routes/signin");
const logOutRouter = require("./routes/logout");
const refreshTokenRouter = require("./routes/refreshToken");
const postsRouter = require("./routes/posts");
const verifyJWT = require("./middleware/verifyJWT");
const errorLogger = require("./utils/errorLogger");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use("/signup", signUpRouter);
app.use("/signin", signInRouter);
app.use("/logout", logOutRouter);
app.use("/refresh-token", refreshTokenRouter);
app.use(verifyJWT);
app.use("/posts", postsRouter);
app.use(errorLogger);

app.listen(PORT, () =>
  console.log(`Server running on https://localhost:${PORT}`)
);
