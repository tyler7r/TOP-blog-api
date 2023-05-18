import React, { useState } from 'react'
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { PostDetail } from './components/PostDetail';

function App() {
  const [userAuth, setUserAuth] = useState(false);
  const [user, setUser] = useState(undefined);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/blog' element={<Home setAuth={setUserAuth} auth={userAuth} user={user} setUser={setUser} />} />
          <Route path='/blog/signup' element={<Signup />} />
          <Route path='/blog/login' element={<Login setAuth={setUserAuth} user={user} setUser={setUser}/>} />
          <Route path='/blog/posts/:postId' element={<PostDetail setAuth={setUserAuth} auth={userAuth} user={user} setUser={setUser} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
