// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import CRUD from './features/CRUD';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/crud" element={<CRUD />} />
      </Routes>
    </div>
  );
};

export default App;
