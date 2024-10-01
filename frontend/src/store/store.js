import { configureStore } from "@reduxjs/toolkit";
import { formReducer } from "./formSlice";
import { api } from "./api";

const store = configureStore({
  reducer: {
    form: formReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
