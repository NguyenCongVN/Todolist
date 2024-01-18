import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodosType } from "../interface/todo";

export interface TodoSliceState {
    value: TodosType[];
}

const todoInitialState: TodoSliceState = {
    value: []
}

const TodoSlice = createSlice({
    name: "todo",
    initialState: todoInitialState,
    reducers: {
        addTodo: (state, action: PayloadAction<TodosType>) => {
            state.value.push(action.payload);
        },
        updateTodo: (state, action: PayloadAction<TodosType>) => {
            state.value.map((item) => {
                if (item.id == action.payload.id) {
                    item.name = action.payload.name;
                    item.description = action.payload.description;
                    item.dueDate = action.payload.dueDate;
                }
            });
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.value = state.value.filter(
                (item) => item.id != action.payload
            );
        },
        completeTodo: (state, action: PayloadAction<string>) => {
            state.value.map((item) => {
                if (item.id == action.payload) {
                    item.completed = !item.completed;
                }
            });
        },
        clearCompleted: (state) => {
            state.value = state.value.filter((item) => item.completed == false);
        },
        setTodos: (state, action: PayloadAction<TodosType[]>) => {
            state.value = action.payload;
        }
    },
});

export const { addTodo, updateTodo, deleteTodo, completeTodo, clearCompleted, setTodos } =
    TodoSlice.actions;

export default TodoSlice.reducer;
