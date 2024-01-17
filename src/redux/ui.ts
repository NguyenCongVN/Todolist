import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "../constant/theme";

export interface UISliceState {
    theme: Theme;
}

const themeInitialState: UISliceState = {
    theme: Theme.LIGHT,
};

const UISlice = createSlice({
    name: "ui",
    initialState: themeInitialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
        },
    },
});

export const { setTheme } =
UISlice.actions;

export default UISlice.reducer;
