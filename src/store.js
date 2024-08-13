import { configureStore } from "@reduxjs/toolkit";
import jokeReducer from "./jokeSlice"; // Import the default export

const store = configureStore({
  reducer: {
    joke: jokeReducer, // Use the reducer from jokeSlice
  },
});

export default store;
