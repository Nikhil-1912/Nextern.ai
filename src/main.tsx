import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

// Environment variable startup check
if (!import.meta.env.VITE_GEMINI_API_KEY) {
  console.warn("⚠️ Warning: VITE_GEMINI_API_KEY is missing from environment variables. AI features may not work as expected.");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
