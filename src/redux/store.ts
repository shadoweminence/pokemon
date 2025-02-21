import { configureStore } from "@reduxjs/toolkit";
import pokReducer from "./pokemon/pokSlice";

export const store = configureStore({
  reducer: {
    pokemon: pokReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
