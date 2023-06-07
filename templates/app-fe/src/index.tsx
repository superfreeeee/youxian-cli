import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.module.scss';

function createApp() {
  // initial

  // render main content
  const root = createRoot(document.querySelector('#app') as HTMLDivElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

createApp();
