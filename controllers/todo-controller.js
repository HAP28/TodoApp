const db = require("../config/database");

// const date = new Date();
exports.createTodo = async (req, res) => {
  console.log(req.body);
  const { title, description, user_id, token } = req.body;
  if (req.body.title !== undefined) {
    const { rows } = await db.query(
      "INSERT INTO todos (todo_title,todo_description,todo_date,user_id) VALUES ($1,$2,$3,$4)",
      [title, description, new Date().toUTCString(), +user_id]
    );
  }
  res.redirect("/home?login="+user_id+'&t='+token);
};

exports.updateTodo = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params);
    const response = await db.query(
      "UPDATE todos SET todo_title = ($1), todo_description = ($2) WHERE todo_id = ($3)",
      [req.body.title, req.body.description, req.params.id]
    );
    console.log("updated");
    res.redirect("/home?login="+req.body.user_id+'&t='+req.body.token);
  } catch (error) {
    res.send(error);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const response = await db.query("DELETE FROM todos WHERE todo_id = ($1)", [
      req.params.id,
    ]);
    console.log("Deleted");
    res.redirect("/home?login="+req.params.user_id+"&t="+req.params.token);
  } catch (error) {
    res.send(error);
  }
};
