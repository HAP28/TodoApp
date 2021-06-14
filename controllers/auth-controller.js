const db = require("../config/database");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// get config vars
dotenv.config();

exports.createUser = (req, res) => {
  try {
    console.log(req.body);
    const { email, full_name, password } = req.body;
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      if (!err) {
        const response = await db.query(
          "INSERT INTO users (full_name,email,password) VALUES ($1,$2,$3)",
          [full_name, email, hash]
        );
        console.log(response.rows);
        res.redirect("/");
      } else {
        res.send(err);
      }
    });
  } catch (error) {
    res.send(error);
  }
};

exports.verifyUser = async (req, res) => {
  try {
    // console.log("h" + req.body);
    const { email, password } = req.body;

    const response = await db.query("SELECT * FROM users WHERE email = ($1)", [
      email,
    ]);
    console.log(response.rows);
    if (response.rowCount > 0) {
      let resp = response.rows;
      bcrypt.compare(password, resp[0].password, function (err, result) {
        if (!err) {
          if (result) {
            let token = jwt.sign(
              { email: resp[0].email, user_id: resp[0].user_id },
              process.env.TOKEN_SECRET
            );
            res.redirect("/home?login=" + resp[0].user_id + "&t=" + token);
            // res.render('/home',{token: token});
          } else {
            res.send("wrong password");
          }
        }
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.verifytoken = async (req, res) => {
  console.log("done");
  jwt.verify(
    req.headers.authorization,
    process.env.TOKEN_SECRET,
    (e, decoded) => {
      if (!e) {
        res.send("decoded");
      } else{
        res.send('hello')
      }
    }
  );
  // res.send('yes')
};

