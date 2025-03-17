import './App.css';

import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import ErrorBoundary from './components/error-boundary';
import { AuthProvider } from './context/auth';
import { Routes } from './routes';
import LamininTheme from './theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={LamininTheme}>
        <ErrorBoundary>
          <AuthProvider>
            <Router>
              <Routes />
            </Router>
          </AuthProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </div>
  );
}

export default App;
