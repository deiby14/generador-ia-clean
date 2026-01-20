/**
 * @fileoverview Application entry point
 * @description Bootstraps the React application and mounts it to the DOM
 * @author Generador IA Team
 * @version 1.0.0
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

/**
 * Application Bootstrap
 * 
 * This is the entry point of the Generador IA application.
 * It creates a React root and renders the App component.
 * 
 * StrictMode is enabled to help identify potential problems
 * in the application during development.
 */

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Ensure the root element exists
if (!rootElement) {
  throw new Error(
    'Failed to find the root element. Make sure there is a <div id="root"></div> in your index.html'
  );
}

// Create the React root and render the application
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
