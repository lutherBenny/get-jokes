import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch a joke based on the category
const fetchJoke = createAsyncThunk("jokes/fetchJoke", async function (category) {
  // Determine the API endpoint based on whether a category is provided
  const url = category 
    ? `https://api.chucknorris.io/jokes/random?category=${category}`
    : `https://api.chucknorris.io/jokes/random`;

  // Make an API request to fetch a joke
  return axios.get(url)
    .then(function (result) {
      return result.data.value; // Return the joke text from the API response
    });
});

// Initial state of the joke slice
const initialState = {
  joke: "", // Default joke text
};

// Joke slice definition using createSlice
const jokeSlice = createSlice({
  name: "joke", // Name of the slice
  initialState, // Initial state
  reducers: {}, // No synchronous reducers needed in this case
  extraReducers: (builder) => {
    builder
      .addCase(fetchJoke.pending, function () {
        console.log("Loading..."); // Log to console when the request is pending
      })
      .addCase(fetchJoke.fulfilled, (state, action) => {
        state.joke = action.payload; // Update state with the fetched joke
      })
      .addCase(fetchJoke.rejected, (state, action) => {
        state.error = action.error.message; // Handle errors
      });
  },
});

export default jokeSlice.reducer; // Export the reducer
export { fetchJoke }; // Export the async thunk
