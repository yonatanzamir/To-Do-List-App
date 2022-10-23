
function Todo(props){
    return(
        <div
        className={"todo " + (props.todo.done ? "is-done" : "")}
        key={props.todo._id}
        onClick={() => props.doneTodo(props.todo._id)}
      >
        <div className="checkbox"></div>
        <div className="task-name"> {props.todo.TaskName} </div>
        <div className="delete-todo" onClick={() => props.deleteTodo(props.todo._id)}>
          x
        </div>
      </div>
    )
}
export default Todo