import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; 
import App from './App.jsx';
import { MessagesProvider } from './context/MessagesContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MessagesProvider>
      <App /> 
    </MessagesProvider>
  </React.StrictMode>
);