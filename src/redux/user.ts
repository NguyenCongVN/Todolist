import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserSliceState {
    username: string;
}

const UserInitialState: UserSliceState = {
    username: "Guest",
};

const UserSlice = createSlice({
    name: "user",
    initialState: UserInitialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
    },
});

export const { setUsername } =
UserSlice.actions;

export default UserSlice.reducer;
