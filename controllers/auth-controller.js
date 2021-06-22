const db = require("../config/database");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nm = require("../service/mailservice");
// const { response } = require("express");
const transporter = nm.transporter;

// get config vars
dotenv.config();

exports.createUser = async (req, res) => {
  console.log(req.body);
  const { email, full_name, password } = req.body;
  // bcrypt.hash(password, saltRounds, async function (err, hash) {
  //   // Store hash in your password DB.
  //   if (!err) {
  // const response = await db
  //   .query(
  //     "INSERT INTO users (full_name,email,password) VALUES ($1,$2,$3)",
  //     [full_name, email, hash]
  //   )
  //       .then((data) => {
  //         console.log(data);
  //         res.redirect("/");
  //       })
  //       .catch((e) => {
  //         console.log("pass");
  //         console.log(e.message);
  //         res.redirect("/register?error=" + e.message);
  //       });
  //   } else {
  //     res.send(err.message);
  //   }
  // });
  try {
    // console.log(await bcryptHash(password));
    const response = await db.query(
      "INSERT INTO users (full_name,email,password) VALUES ($1,$2,$3)",
      [full_name, email, await bcryptHash(password)]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/register?error=" + err.message);
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
          } else {
            res.redirect("/?error=wrong password");
          }
        }
      });
    } else {
      res.redirect("/?error=user doesn't exist");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.verifytoken = async (req, res) => {
  console.log("done");
  await jwt.verify(
    req.headers.authorization,
    process.env.TOKEN_SECRET,
    (e, decoded) => {
      if (!e) {
        res.send("decoded");
      } else {
        res.send(e);
      }
    }
  );
  // res.send('yes')
};

exports.emailVerification = async (req, res) => {
  console.log(req.query.token);
  await jwt.verify(req.query.token, process.env.TOKEN_SECRET, (e, decoded) => {
    if (!e) {
      console.log(decoded);
      const response = db.query(
        "UPDATE users SET is_verified = TRUE WHERE email = ($1)",
        [decoded.email]
      );
      console.log(response.rows);
      res.redirect("/");
    } else {
      res.send("Email not verified");
    }
  });
};

function bcryptHash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}
