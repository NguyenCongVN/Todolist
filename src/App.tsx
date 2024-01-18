// React
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";

// Components
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Todolist from "./components/TodoList/TodoList";

// Action
import { addTodo } from "./redux/todos";
import { setUsername } from "./redux/user";

// Other libraries
import { nanoid } from "nanoid";

const App: React.FC = () => {
  // Selector
  const theme = useAppSelector((state: RootState) => state.UIReducer.theme);
  const username = useAppSelector(
    (state: RootState) => state.UserReducer.username
  );

  // Dispatch
  const dispatch = useAppDispatch();

  // Local State
  // variable to save the name of the new todo
  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [dueDate, setDueDate] = useState<string>(new Date().toISOString());
  const [usernameDialog, setUsernameDialog] = useState("");
  const [open, setOpen] = useState(username === "Guest");
  const [errorSetUsername, setErrorSetUsername] = useState(false);
  const [errorAddTodo, setErrorAddTodo] = useState(false);

  return (
    <div className="container">
      <Header setOpen={setOpen} />
      <Box className="new_todo">
        <Typography variant="body1" sx={{ flex: "1", padding: "0 0.7rem" }}>
          <b>Todo name</b>
        </Typography>
        <input
          required
          type="text"
          placeholder="Enter to create a new todo"
          onChange={(e) => setTodoName(e.target.value)}
          onKeyDown={(e) => {
            // Check if the key pressed is Enter
            if (e.key === "Enter") {
              // Check todo name is not empty
              if (todoName.length === 0) {
                setErrorAddTodo(true);
                return;
              }

              // Check due date is not empty
              if (dueDate.length === 0) {
                setErrorAddTodo(true);
                return;
              }

              setErrorAddTodo(false);

              // dispatch the action to add a new todo
              dispatch(
                addTodo({
                  id: nanoid(),
                  name: todoName,
                  completed: false,
                  dueDate: dueDate,
                  description: todoDescription,
                })
              );
              // clear the input field
              setTodoName("");
              // clear the description field
              setTodoDescription("");
            }
          }}
          value={todoName}
        />
        <Box>
          <button
            className="new_todo-btn"
            onClick={() => {
              // Check todo name is not empty
              if (todoName.length === 0) {
                setErrorAddTodo(true);
                return;
              }

              // Check due date is not empty
              if (dueDate.length === 0) {
                setErrorAddTodo(true);
                return;
              }

              setErrorAddTodo(false);

              // dispatch the action to add a new todo
              dispatch(
                addTodo({
                  id: nanoid(),
                  name: todoName,
                  description: todoDescription,
                  dueDate: dueDate,
                  completed: false,
                })
              );

              // clear the input field
              setTodoName("");
              // clear the description field
              setTodoDescription("");
            }}
          >
            Add
          </button>
        </Box>
      </Box>

      <Box className="new_todo new_todo_description">
        <textarea
          placeholder="Description"
          onChange={(e) => setTodoDescription(e.target.value)}
          value={todoDescription}
        />
      </Box>

      <Box className="new_todo new_todo_due_date">
        <Typography variant="body1" sx={{ flex: "1", padding: "0 0.7rem" }}>
          <b>Due date</b>
        </Typography>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => {
            if (e.target.valueAsDate) {
              setDueDate(e.target.value);
            }
          }}
        />
      </Box>

      {/* Show error add todo */}
      {errorAddTodo && (
        <Typography variant="body1" color="error">
          Please enter valid todo name
        </Typography>
      )}

      <Todolist colorTheme={theme} />
      <div className="reorder">Drag and drop to reorder list</div>
      <Footer />

      <Dialog open={open}>
        <DialogTitle>Please enter your name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Username"
            fullWidth
            variant="standard"
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setUsernameDialog(e.target.value);
              }
            }}
          />
          {errorSetUsername && (
            <Typography variant="caption" color="error">
              Please enter valid name
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            onClick={() => {
              if (usernameDialog.length === 0) {
                setErrorSetUsername(true);
                return;
              }

              dispatch(setUsername(usernameDialog));
              setOpen(false);
            }}
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
