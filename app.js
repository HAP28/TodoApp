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
app.use("/api/", todoRoute);

//config
require("dotenv/config");

app.get("/", async (req, res) => {
  const response = await db.query("SELECT * FROM todos ORDER BY todo_date");
  res.render("index", { title: "Amaze - TODO", todos: response.rows });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running on http://localhost:${process.env.PORT}`);
});

function convertDate(inputFormat) {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
}
