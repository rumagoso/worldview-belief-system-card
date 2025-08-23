import React from 'react';
import { createRoot } from 'react-dom/client';
import WBSCGenerator from './WBSCGenerator';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<WBSCGenerator />);
  } else {
    console.error('Root element not found');
  }
});
