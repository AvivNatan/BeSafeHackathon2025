import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; 
import App from './App.jsx';
import { MessagesProvider } from './context/MessagesContext.jsx';
import { UserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <MessagesProvider>
        <App /> 
      </MessagesProvider>
    </UserProvider>
  </React.StrictMode>
);