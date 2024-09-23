import { createSlice, PayloadAction , Slice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

export interface DarkModeState {
  darkModeState: string;
}

const initialState: DarkModeState = {
  darkModeState: "light",
};

export const darkModeSlice: Slice<DarkModeState> = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setDarkModeState: (state, action: PayloadAction<string>) => {
      state.darkModeState = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload[darkModeSlice.name],
      };
    },
  },
});

export const { setDarkModeState } = darkModeSlice.actions;
//O código foi escrito em TypeScript e define uma função seletora para recuperar
// o estado do modo "light" que está como padrão do estado do aplicativo (AppState)
export const selectDarkModeState = (state: AppState) => state.darkMode.darkModeState;

export default darkModeSlice.reducer;
