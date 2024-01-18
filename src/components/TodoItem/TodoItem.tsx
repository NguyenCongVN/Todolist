import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { completeTodo, deleteTodo } from "../../redux/todos";
import { TodosType } from "../../interface/todo";

export type TodoProps = {
  todo: TodosType;
};

const TodoItem = ({ todo }: TodoProps) => {
  const dispatch = useDispatch();

  function completedHandler() {
    dispatch(completeTodo(todo.id));
  }

  function deleteHandler() {
    dispatch(deleteTodo(todo.id));
  }

  return (
    <div className="todo_item">
      <Box className="checkbox_container">
        <button
          onClick={completedHandler}
          className={`${todo.completed ? "checkbox-checked" : "checkbox"}`}
        ></button>
      </Box>
      <Box
        sx={{ flex: "1", padding: "10px" }}
        className={`${todo.completed ? "todo_item--completed" : ""}`}
      >
        {todo.name}
      </Box>
      <Box>
        <button className="todo_item--btn todo_item--btn-delete" onClick={deleteHandler}>
          <CloseIcon className="icon" />
        </button>
      </Box>
    </div>
  );
};

export default TodoItem;
