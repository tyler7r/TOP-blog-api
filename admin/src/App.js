import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home';
import { Post } from './components/Post';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/admin' element={<Home />} />
          <Route path='/admin/post/create' element={<Post />} />
          <Route path='/admin/post/:id/update' element={<Post />} />
          <Route path='/admin/post/:id/delete' element={<Post />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
