import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {CanvasProvider} from '@workday/canvas-kit-react/common';

// Canvas design tokens are plain CSS custom properties. Loading these three
// sheets is what makes every `system.*` token reference resolve at runtime.
import '@workday/canvas-tokens-web/css/base/_variables.css';
import '@workday/canvas-tokens-web/css/brand/_variables.css';
import '@workday/canvas-tokens-web/css/system/_variables.css';
import './styles.css';

import {App} from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CanvasProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CanvasProvider>
  </React.StrictMode>
);
