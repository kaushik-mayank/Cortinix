import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Stylesheets — order matters: tokens → keyframes → base → components → pages
import './styles/variables.css';
import './styles/animations.css';
import './styles/globals.css';
import './styles/components.css';
import './styles/pages.css';

import App from './App.jsx';

// The app already scrolls to the top on every route change (see App.jsx);
// leaving the browser's own scroll restoration on fights that behavior,
// producing a flash of the previous page's scroll position on navigation.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
