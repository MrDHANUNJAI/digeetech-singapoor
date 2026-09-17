import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

// Global error handlers to prevent telemetry/tracer noise from breaking the app runtime
window.addEventListener('unhandledrejection', (event) => {
  // Prevent Vercel Client Tracer empty object promise rejections from bubbling up
  event.preventDefault();
  if (event.reason && typeof event.reason === 'object' && Object.keys(event.reason).length === 0) {
    return;
  }
  if (event.reason) {
    console.warn('[Suppressed Background Async Rejection]:', event.reason);
  }
});

window.addEventListener('error', (event) => {
  event.preventDefault();
  if (event.message && (event.message.includes('Vercel Client Tracer') || event.message.includes('Script error'))) {
    return;
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
