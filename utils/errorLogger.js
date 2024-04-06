const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");

async function errorLogger(error, req, res, next) {
  const date = format(new Date(), "yyyy-MM-dd HH:mm");
  const logItem = `${date}\t${req.method}\t${req.originalUrl}\t${error}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "Logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "Logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "Logs", "error-logs.txt"),
      logItem
    );
    res.sendStatus(500);
  } catch (e) {
    console.error(e);
  }
}

module.exports = errorLogger;
