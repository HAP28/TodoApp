const express = require("express");
const env = require("dotenv");
const bodyParser = require("body-parser");
// const ejs = require('ejs')
const path = require("path");
const db = require("./config/database");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static("static"));
const todoRoute = require("./routes/todo");
const authRoute = require("./routes/auth");
app.use("/api/", todoRoute);
app.use("/auth/", authRoute);

//config
require("dotenv/config");

app.get("/", (req,res) => {
  res.render('login', {title: "Login"});
});

app.get("/register", (req,res) => {
  res.render('register', {title: "Registration"});
});

app.get("/home", async (req, res) => {
  try{
    const response = await db.query("SELECT * FROM todos WHERE user_id = ($1) ORDER BY todo_date", [+req.query.login]);
    console.log(req.query);
    const responseUser = await db.query("SELECT * FROM users where user_id = " + +req.query.login );
    // console.log(responseUser.rows);
    res.render("index", { title: "Amaze - TODO", todos: response.rows, user: responseUser.rows, token: req.query.t });
  }catch(error){
    console.log(error);
    res.redirect('/');
  }
});

app.listen(process.env.PORT, () => {
  console.log(`App is running on http://localhost:${process.env.PORT}`);
});

// function convertDate(inputFormat) {
//   function pad(s) {
//     return s < 10 ? "0" + s : s;
//   }
//   var d = new Date(inputFormat);
//   return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
// }
