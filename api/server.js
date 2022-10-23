const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const uri =
  "mongodb+srv://yonatanz1997:14241424@cluster0.yne74xi.mongodb.net/?retryWrites=true&w=majority";
app.use(express.json());
app.use(cors());

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("connected to the DB!");
  } catch (err) {
    console.error(err);
  }
}
connect();
const Todo = require("./models/TodoDB");

app.get("/get-all-todo", async (req, res) => {
  const todoList = await Todo.find();

  res.json(todoList);
});
app.post("/add-new-todo", (req, res) => {
  const newTodo = new Todo({
    TaskName: req.body.text,
  });
  newTodo.save();
  
  res.json(newTodo)
});
app.delete('/delete-todo/:id',async (req,res)=>{
  const deletedTodo=await Todo.findByIdAndDelete(req.params.id)

  res.json(deletedTodo)
})
app.put('/change-todo-done/:id',async (req,res)=>{
  const todo=await Todo.findById(req.params.id)
  todo.done= !todo.done;
  todo.save();
  res.json(todo)
})
app.listen(3001, () => {
  console.log("server get started on port 8000");
});
