// src/main.jsx (or src/index.jsx)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider
import { ComplaintsProvider } from './context/ComplaintsContext';
import './App.css'; // Global CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* FIX: THEMEPROVIDER MUST WRAP THE APP HERE */}
    <ThemeProvider>
      <ComplaintsProvider>
        <App />
      </ComplaintsProvider>
    </ThemeProvider>
  </React.StrictMode>,
);