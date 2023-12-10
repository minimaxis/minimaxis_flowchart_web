import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import mermaid from "mermaid";
import './App.css'

mermaid.initialize({
  startOnLoad: true,
});

const Mermaid = ({ chart, key }) => {
  useEffect(() => {
    mermaid.contentLoaded();
  }, [chart, key]);

  return <div className="mermaid">{chart}</div>;
};

const App = () => {
  const [miniscriptValue, setMiniscriptValue] = useState("");
  const [mermaidChart, setMermaidChart] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mermaidKey, setMermaidKey] = useState(0);

  const handleMiniscriptChange = (event) => {
    setMiniscriptValue(event.target.value);
  };

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/miniscript_to_sympy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ miniscript: miniscriptValue }),
      });

      console.log("Response:", response);

      if (response.ok) {
        const data = await response.json();
        console.log("Data:", data);

        setMermaidChart(data.result);

        setMermaidKey((prevKey) => prevKey + 1);
      } else {
        const errorMessage = await response.text(); // Read the response body
        console.error("Error fetching data:", errorMessage);
        setError("Error fetching data");
      }
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter miniscript"
        value={miniscriptValue}
        onChange={handleMiniscriptChange}
      />
      <button onClick={handleFetchData}>Generate Miniscrip</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Mermaid chart={mermaidChart} key={mermaidKey} />
    </div>
  );
};

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
