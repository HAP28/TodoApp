const db = require("../config/database");

// const date = new Date();
exports.createTodo = async (req, res) => {
  console.log(req.body);
  if (req.body.title !== undefined) {
    const { title, description } = req.body;
    const { rows } = await db.query(
      "INSERT INTO todos (todo_title,todo_description,todo_date) VALUES ($1,$2,$3)",
      [title, description, new Date().toUTCString()]
    );
  }
  res.redirect("/");
};

exports.updateTodo = async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  const response = await db.query(
    "UPDATE todos SET todo_title = ($1), todo_description = ($2) WHERE todo_id = ($3)",
    [req.body.title, req.body.description, req.params.id]
  );
  console.log("updated");
  res.redirect("/");
};

exports.deleteTodo = async (req, res) => {
  const response = await db.query(
    "DELETE FROM todos WHERE todo_id = ($1)",[req.params.id]
  );
  console.log("Deleted");
  res.redirect("/");
};
