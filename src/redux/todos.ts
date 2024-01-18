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
    },
});

export const { addTodo, deleteTodo, completeTodo, clearCompleted } =
    TodoSlice.actions;

export default TodoSlice.reducer;
