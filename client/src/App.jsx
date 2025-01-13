import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/counter`);
      const data = await response.json();
      setCount(data.count);
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };

  const incrementCount = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/counter/increment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setCount(data.count);
    } catch (error) {
      console.error('Error incrementing count:', error);
    }
  };

  return (
    <main>
      <h1>Welcome to PERN Starter Kit</h1>
      <p>A modern full-stack starter template for building web applications</p>
      <div className="counter-section">
        <p>Current count: {count}</p>
        <button onClick={incrementCount}>Increment Count</button>
      </div>
    </main>
  );
}

export default App; 