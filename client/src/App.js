import React, { useEffect, useState } from 'react'
import { Signup } from './components/Signup';

function App() {
  // const [backendData, setBackendData] = useState([{}])

  // useEffect(() => {
  //   fetch('/blog/login').then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       setBackendData(data)
  //     }
  //   )
  // }, []);

  return (
    <div className="App">
      <Signup />
    </div>
  );
}

export default App;
