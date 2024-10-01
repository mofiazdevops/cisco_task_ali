import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  organization_name: "",
  measures: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFormData: () => initialState,
  },
});

export const { setFormData, resetFormData } = formSlice.actions;

export const formReducer = formSlice.reducer;
