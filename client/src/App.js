import React from 'react'
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { Signup } from './components/Signup';
import { Login } from './components/Login';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/blog/signup' element={<Signup />} />
          <Route path='/blog/login' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
