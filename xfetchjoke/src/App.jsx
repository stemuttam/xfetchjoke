import React, { useState } from "react";
import "./App.css";

function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJoke = async () => {
    setLoading(true);
    setError("");
    setJoke(null);

    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );

      if (!response.ok) {
        throw new Error("Failed");
      }

      const data = await response.json();
      setJoke(data);
    } catch (err) {
      setError("Error fetching joke!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Random Joke Generator</h1>

      <button onClick={fetchJoke} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Joke"}
      </button>

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {joke && (
        <div className="joke">
          <h3>{joke.setup}</h3>
          <p>{joke.punchline}</p>
        </div>
      )}
    </div>
  );
}

export default App;