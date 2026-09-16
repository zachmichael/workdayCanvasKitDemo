import {Navigate, Route, Routes, useLocation} from 'react-router-dom';

import {AppShell} from './components/AppShell';
import {ErrorBoundary} from './components/ErrorBoundary';
import {ButtonsPage} from './pages/ButtonsPage';
import {FormsPage} from './pages/FormsPage';
import {DataPage} from './pages/DataPage';
import {FeedbackPage} from './pages/FeedbackPage';
import {NavigationPage} from './pages/NavigationPage';
import {TokensPage} from './pages/TokensPage';
import {NotFoundPage} from './pages/NotFoundPage';

export const App = () => {
  const location = useLocation();

  return (
    <AppShell>
      {/* Keying the boundary on the path lets a failed page recover on navigation. */}
      <ErrorBoundary key={location.pathname}>
        <Routes>
          <Route path="/" element={<Navigate to="/buttons" replace={true} />} />
          <Route path="/buttons" element={<ButtonsPage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/navigation" element={<NavigationPage />} />
          <Route path="/tokens" element={<TokensPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </AppShell>
  );
};
