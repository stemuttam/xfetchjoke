import { useState } from "react";
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
        throw new Error();
      }

      const data = await response.json();
      setJoke(data);
    } catch {
      setError("Could not fetch a joke. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Random Joke</h1>

      <p>Click the button to fetch a fresh one.</p>

      <button onClick={fetchJoke} disabled={loading}>
        {loading
          ? "Fetching..."
          : error
          ? "Try again"
          : "Fetch joke"}
      </button>

      {error && <p className="error">{error}</p>}

      {joke && (
        <div className="joke">
          <h2>{joke.setup}</h2>
          <p>{joke.punchline}</p>
        </div>
      )}
    </div>
  );
}

export default App;