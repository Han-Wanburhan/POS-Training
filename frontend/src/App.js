import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = () => {
    fetch("http://localhost:3001/api")
      .then((response) => response.text())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setTimeout(fetchData, 2000);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>React with Nest.js & Electron</h1>
      <p>
        Data from backend:
        {loading ? "Loading..." : error ? `Error: ${error.message}` : data}
      </p>
    </div>
  );
}

export default App;
