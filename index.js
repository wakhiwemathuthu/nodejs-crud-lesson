const express = require("express");
const app = express();
const path = require("path");
const rootRouter = require("./routes/root");
const usersRouter = require("./routes/api/users");
const authRouter = require("./routes/auth");
const accountActivation = require("./routes/account-activation");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const errorLogger = require("./utils/error-logger");
require("dotenv").config();
const refreshAccessTokenRouter = require("./routes/refresh-access-token");
const cookieParser = require("cookie-parser");
const logoutRouter = require("./routes/logout");

const PORT = process.env.PORT;

if (!fs.existsSync(path.join(__dirname, "Logs"))) {
  fs.mkdir(path.join(__dirname, "Logs"), (err) => {
    if (err) throw err;
  });
}
const ws = fs.createWriteStream(
  path.join(__dirname, "Logs", "access-log.txt"),
  "utf8"
);

app.use(morgan("tiny", { stream: ws }));
app.use(cors({ origin: "*" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());
app.use(rootRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/account-activation", accountActivation);
app.use("/refresh-token", refreshAccessTokenRouter);
app.use("/logout", logoutRouter);
app.use(errorLogger);

app.listen(PORT, () =>
  console.log(`Server running on...http://localhost:${PORT}`)
);
