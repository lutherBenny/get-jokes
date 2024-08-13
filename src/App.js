import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJoke } from "./jokeSlice";
import "./App.css";

function App() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const joke = useSelector((state) => state.joke.joke);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch available categories on component mount
    axios.get("https://api.chucknorris.io/jokes/categories")
      .then(response => setCategories(response.data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  function handleChangeCategory(e) {
    setCategory(e.target.value);
    setError(""); // Clear error when input changes
  }

  function handleFetch() {
    if (!category) {
      setLoading(true);
      dispatch(fetchJoke(category)).finally(() => setLoading(false));
    } else if (categories.includes(category.toLowerCase())) {
      setLoading(true);
      dispatch(fetchJoke(category)).finally(() => setLoading(false));
    } else {
      setError(`Error: "No jokes for category "${category}" found." Available lists are ${categories.join(', ')}.`);
      setCategory(""); // Clear the input
    }
  }

  return (
    <div className="app-container">
      <div className="search-box">
        <input
          value={category}
          onChange={handleChangeCategory}
          placeholder="Input search text"
          className="input-box"
        />
        <button onClick={handleFetch} className="fetch-button">
          {category ? `Get from ${category}` : "Get Random"}
        </button>
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {joke && <h1>{joke}</h1>}
          {error && <h1 className="error-message">{error}</h1>}
        </>
      )}
    </div>
  );
}

export default App;
