import { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTodo,
  clearCompleted,
  TodosType,
  TodoSliceState,
} from "../../redux/todos";
import { RootState } from "../../redux/store";
import { ToDoItemState } from "../../constant/todoItem";

// Components
import TodoItem from "../TodoItem/TodoItem";
import { Box } from "@mui/material";

export interface ThemeProps {
  colorTheme: string;
}

const Todolist = ({ colorTheme }: ThemeProps) => {
  // Local State
  const [visibleTodos, setVisibleTodos] = useState(ToDoItemState.ALL);

  // Dispatch
  const dispatch = useDispatch();

  // Selector
  const todos = useSelector<RootState, TodoSliceState>(
    (state) => state.TodoReducer
  );

  // Segregate todos based on their completion status / active
  const activeTodos =
    todos &&
    todos.value.filter(
      (item: { id: string; name: string; completed: boolean }) => {
        return item.completed == false;
      }
    );

  // Segregate todos based on their completion status / completed
  const completedTodos =
    todos &&
    todos.value.filter(
      (item: { id: string; name: string; completed: boolean }) => {
        return item.completed == true;
      }
    );

  // Mode of current ToDo to show
  // Render based on the mode
  const currentTodos =
    visibleTodos == ToDoItemState.ALL
      ? todos.value
      : visibleTodos == ToDoItemState.ACTIVE
      ? activeTodos
      : visibleTodos == ToDoItemState.COMPLETED
      ? completedTodos
      : todos.value;

  return (
    <Box className="Card">
      <Box className="todo_list">
        {todos &&
          currentTodos?.map(
            (
              item: {
                id: string;
                name: string;
                completed: boolean;
              },
              index: number
            ) => (
              <TodoItem
                deleteHandler={() =>
                  // Pass the id of the todo to be deleted
                  dispatch(deleteTodo(item.id))
                }
                index={index}
                key={item.id}
                id={item.id}
                completed={item.completed}
                name={item.name}
              />
            )
          )}

        <Box className="controls">
          <Box>
            <span>{currentTodos?.length | 0} items left</span>
          </Box>

          <Box className="segregate" data-theme={colorTheme}>
            <button
              className={`segregate-btn segregate-btn-${
                visibleTodos == ToDoItemState.ALL && ToDoItemState.ACTIVE
              }`}
              id="all"
              onClick={() => setVisibleTodos(ToDoItemState.ALL)}
            >
              All
            </button>
            <button
              className={`segregate-btn segregate-btn-${
                visibleTodos == ToDoItemState.ACTIVE && ToDoItemState.ACTIVE
              }`}
              id="active"
              onClick={() => setVisibleTodos(ToDoItemState.ACTIVE)}
            >
              Active
            </button>
            <button
              className={`segregate-btn segregate-btn-${
                visibleTodos == ToDoItemState.COMPLETED && ToDoItemState.ACTIVE
              }`}
              id="completed"
              onClick={() => setVisibleTodos(ToDoItemState.COMPLETED)}
            >
              Completed
            </button>
          </Box>

          <Box className="clear" data-theme={colorTheme}>
            <button
              className="clear-btn"
              data-theme={colorTheme}
              onClick={() => dispatch(clearCompleted())}
            >
              Clear Completed
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Todolist;
