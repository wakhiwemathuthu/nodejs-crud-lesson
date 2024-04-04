const usersDB = {
  users: require("../data/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");
const fsPromises = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");
const nodemailer = require("nodemailer");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const PASS = process.env.NODE_MAILER_PASS;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "wakhiwemathuthu6@gmail.com",
    pass: PASS,
  },
});

async function registerUser(req, res, next) {
  const userId = uuid();

  const mailOptions = {
    from: "wakhiwemathuthu6@gmail.com",
    to: req.body.email,
    subject: "Account activation",
    html: `<p>Follow this link to activate your account</p> <a href="http://localhost:8080/account-activation/${userId}">Link</a> `,
  };
  const { email, age, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    email,
    age,
    password: hashedPassword,
    id: userId,
    activated: false,
  };

  const sameUser = usersDB.users.find((user) => user.email === email);

  if (sameUser) {
    return res
      .status(409)
      .json({ "message ": "User with the same email already exists" });
  }
  try {
    const emailResponse = await transport.sendMail(mailOptions);
    console.log(emailResponse);
    usersDB.setUsers([...usersDB.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "data", "users.json"),
      JSON.stringify(usersDB.users)
    );

    res.status(201).json({
      message: `New user created: ${email}.Follow the link sent to your email to activate your account`,
    });
  } catch (e) {
    console.error(e);
    next(e);
    res.status(500).json({ message: `An error occured: ${e}` });
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;
  const user = usersDB.users.find((user) => user.email === email);
  const otherUsers = usersDB.users.filter((user) => user.email !== email);
  if (!user) {
    return res
      .status(404)
      .json({ message: `User with email: ${email} was not found` });
  }
  if (user.activated === false) {
    return res.status(401).json({
      message:
        "Failed to signin: Account not activated.Follow a link sent to your email to activate",
    });
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const accessToken = jwt.sign({ email: user.email }, ACCESS_TOKEN_SECRET, {
      expiresIn: "20s",
    });
    const refreshToken = jwt.sign({ email: user.email }, REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    const updatedUser = { ...user, refreshToken, accessToken };
    usersDB.setUsers([...otherUsers, updatedUser]);
    try {
      await fsPromises.writeFile(
        path.join(__dirname, "..", "data", "users.json"),
        JSON.stringify(usersDB.users)
      );
    } catch (e) {
      console.log(e);
    }
    return res.json({ accessToken, refreshToken });
  } else {
    return res.status(401).json({ message: "incorrect password" });
  }
}

module.exports = { registerUser, signIn };
