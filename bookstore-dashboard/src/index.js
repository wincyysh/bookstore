// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import bookService from './services/bookService';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <bookService />
  </React.StrictMode>
);
