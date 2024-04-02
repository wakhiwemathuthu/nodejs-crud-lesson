const express = require("express");
const app = express();
const path = require("path");
const rootRouter = require("./routes/root");
const usersRouter = require("./routes/api/users");
const authRouter = require("./routes/auth");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const errorLogger = require("./utils/error-logger");

const PORT = 8080;

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
app.use(cors({ origin: "https://freemelodies.co.za" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(rootRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use(errorLogger);

app.listen(PORT, () =>
  console.log(`Server running on...http://localhost:${PORT}`)
);
