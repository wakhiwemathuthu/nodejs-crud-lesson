const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const { format } = require("date-fns");

async function errorLogger(error, req, res, next) {
  const time = format(new Date(), "yyyy-MM-dd HH:mm");
  const logItem = `${time}\t${req.method}\t${req.originalUrl}\t${error}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "Logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "Logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "Logs", "error-log.txt"),
      logItem
    );
  } catch (e) {
    console.error(e);
  }
}

module.exports = errorLogger;
