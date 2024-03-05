import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios here
6
import './App.css';

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    // Use an arrow function for the effect to properly clean up
    axios.get("/api/jokes")
      .then((response) => {
        setJokes(response.data);
      })
      .catch((error) => {
        console.error(error); // Use console.error for logging errors
      });
  }, []); // Add an empty dependency array to run the effect only once

  return (
    <>
      <h1>Anish Gautam</h1>
      <p>JoKes: {jokes.length}</p>
      {
        jokes.map((joke, index) => (
          // Use parentheses instead of curly braces for the map function
          <div key={joke.id}>
            <h3>{joke.title}</h3>
            <p>{joke.content}</p> {/* Fix the typo in 'content' */}
          </div>
        ))
      }
    </>
  );
}

export default App; // Remove the unnecessary "=6"
