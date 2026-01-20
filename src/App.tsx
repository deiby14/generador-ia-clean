/**
 * @fileoverview Main App component
 * @description Root component that sets up the application structure
 * @author Generador IA Team
 * @version 1.0.0
 */

import React from 'react';
import Home from './pages/Home';

/**
 * App Component
 * 
 * The root component of the Generador IA application.
 * Currently renders the Home page directly.
 * 
 * In a larger application, this would include:
 * - React Router for navigation
 * - Context providers (theme, auth, etc.)
 * - Global error boundaries
 * - Layout components
 * 
 * @returns {JSX.Element} The rendered application
 */
const App: React.FC = () => {
  return (
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  );
};

export default App;
