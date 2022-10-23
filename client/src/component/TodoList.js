import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Todo from "./Todo";

function TodoList(props) {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodoList();
  }, []);

  const addTodo = async () => {
    const todoToAdd = await fetch(props.apiAddress + "/add-new-todo/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());
    setTodoList([...todoList, todoToAdd]);

    setNewTodo("");
  };

  const GetTodoList = () => {
    fetch(props.apiAddress + "/get-all-todo")
      .then((res) => res.json())
      .then((data) => setTodoList(data))
      .catch((err) => console.error("error: ", err));
  };

  const doneTodo = async (id) => {
    const todoToChnace = await fetch(
      props.apiAddress + "/change-todo-done/" + id,
      {
        method: "PUT",
      }
    ).then((res) => res.json());
    setTodoList((todoList) =>
      todoList.map((todo) => {
        if (todo._id === todoToChnace._id) {
          todo.done = todoToChnace.done;
        }
        return todo;
      })
    );
  };
  const deleteTodo = async (id) => {
    const todoToDelete = await fetch(props.apiAddress + "/delete-todo/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
    setTodoList((todoList) =>
      todoList.filter((todo) => todo._id !== todoToDelete._id)
    );
  };

  return (
    <div className="todolist">
      <input
        type="text"
        placeholder="Please enter your next task here ..."
        className="add-todo-input"
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo}
      />
      <div className="button"  onClick={addTodo}>
        Create Todo
      </div>
      <hr />
      {todoList.map((todo) => (
        <Todo
          doneTodo={doneTodo}
          deleteTodo={deleteTodo}
          key={todo._id}
          todo={todo}
        ></Todo>
      ))}
    </div>
  );
}

export default TodoList;
