import React, { useState } from 'react'
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { Home } from './components/Home';

function App() {
  const [userAuth, setUserAuth] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/blog' element={<Home />} />
          <Route path='/blog/signup' element={<Signup />} />
          <Route path='/blog/login' element={<Login setAuth={setUserAuth} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
