import { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTodo,
  clearCompleted,
  TodoSliceState,
  setTodos,
} from "../../redux/todos";
import { RootState } from "../../redux/store";
import { ToDoItemState } from "../../constant/todoItem";

// Components
import TodoItem from "../TodoItem/TodoItem";
import { Box } from "@mui/material";

import {
  DropResult,
  DraggableProvided,
  DroppableProvided,
  resetServerContext
} from "react-beautiful-dnd";
import { AppDraggableList } from "../DragAndDrop/DragAndDrop";
import { TodosType } from "../../interface/todo";

export interface ThemeProps {
  colorTheme: string;
}

const Todolist = ({ colorTheme }: ThemeProps) => {

  useEffect(() => {
    resetServerContext();
  }, []);

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

  const handleDragEnd = (result: DropResult) => {
    // Handle drag end logic
    console.log('result', result)

    // Get source item
    const source = result.source;

    // Get destination item
    const destination = result.destination;

    // If there is no destination, do nothing
    if (!destination) {
      return;
    }

    // If the source and destination are the same, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Reorder the list
    const newTodos = [...todos.value];

    // Remove the item from the source position
    const [removed] = newTodos.splice(source.index, 1);

    // Add the item to the destination position
    newTodos.splice(destination.index, 0, removed);

    // Update the state
    dispatch(setTodos(newTodos));
  };

  const renderTodoItem = (todo: TodosType, provided: DraggableProvided) => {
    return (
      <div
        className="item"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <TodoItem todo={todo} />
      </div>
    );
  };

  return (
    <Box className="Card">
      <Box
        className="todo_list"
      >
        {todos && (
          <AppDraggableList
            droppableId="todolist" // specific for this drag n drop container
            data={currentTodos}
            onDragEnd={handleDragEnd}
            renderItem={renderTodoItem}
            direction="vertical"
          />
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
