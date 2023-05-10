import React, { useEffect, useState } from 'react'

function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch('/blog/login').then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, []);

  return (
    <div className="App">
      {(typeof backendData.title === 'undefined') ? (
        <p>Loading...</p>
      ): (
        <p>{backendData.title}</p>
        )
      }
    </div>
  );
}

export default App;
