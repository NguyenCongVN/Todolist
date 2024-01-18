import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { completeTodo, deleteTodo, updateTodo } from "../../redux/todos";
import { TodosType } from "../../interface/todo";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";


export type TodoProps = {
  todo: TodosType;
};

const TodoItem = ({ todo }: TodoProps) => {
  const dispatch = useDispatch();

  // Local state
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [todoNameEdit, setTodoNameEdit] = useState(todo.name);
  const [todoDescriptionEdit, setTodoDescriptionEdit] = useState(
    todo.description
  );
  const [dueDateEdit, setDueDateEdit] = useState(todo.dueDate);

  function completedHandler() {
    dispatch(completeTodo(todo.id));
  }

  function deleteHandler() {
    dispatch(deleteTodo(todo.id));
  }

  function editHandler() {
    setIsEdit(!isEdit);
  }

  return (
    <div
      className="todo_item_container"
    >
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
            {/* Edit mode */}
          {isEdit ? (
            <div className="todo_item_edit-title-container">
                <input
                  type="text"
                  className="todo_item_edit-title"
                  value={todoNameEdit}
                  onChange={(e) => setTodoNameEdit(e.target.value)}
                />

                {/* Due date */}
                <input
                  type="date"
                  className="todo_item_edit-date"
                  value={dueDateEdit}
                  onChange={(e) => setDueDateEdit(e.target.value)}
                />
            </div>
          ) : (
            <Typography
                className="todo_item--title"
            // @ts-ignore
              variant="heading1"
              sx={{ flex: "1", padding: "0 0.7rem" }}
              onClick={() => setOpen(!open)}
            >
              <p>
                {todo.name}
              </p>

              <p>
                {new Date(todo.dueDate).toLocaleDateString()}
              </p>
            </Typography>
          )}
        </Box>
        {/* Box edit and delete */}
        <Box>
          {isEdit ? (
            <button
              className="todo_item--btn"
              onClick={() => {
                setIsEdit(false);

                // Update the todo
                dispatch(
                  updateTodo({
                    id: todo.id,
                    name: todoNameEdit,
                    dueDate: dueDateEdit,
                    description: todoDescriptionEdit,
                    completed: todo.completed,
                  })
                );
              }}
            >
              <DoneIcon />
            </button>
          ) : null}
          {!isEdit ? (
            <button className="todo_item--btn" onClick={editHandler}>
              <EditIcon className="icon" />
            </button>
          ) : null}

          {!isEdit ? (
            <button
              className="todo_item--btn todo_item--btn-delete"
              onClick={deleteHandler}
            >
              <CloseIcon className="icon" />
            </button>
          ) : null}
        </Box>
      </div>

      <Collapse in={open}>
        <Box className="todo_item--description">
          {isEdit ? (
            <textarea
              className="todo_item_edit-description"
              value={todoDescriptionEdit}
              onChange={(e) => setTodoDescriptionEdit(e.target.value)}
            />
          ) : todo.description === "" ? (
            "No description"
          ) : (
            todo.description
          )}
        </Box>
      </Collapse>
    </div>
  );

};

export default TodoItem;
