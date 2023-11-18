import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Chart, registerables } from 'chart.js';
import StudentProvider from './context/providers/StudentProvider';
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import ThemeProvider from './theme';
import Root from './pages/layouts/Root';
import SchoolSessionProvider from './context/providers/SchoolSessionProvider';
import UserProvider from './context/providers/UserProvider';
import TeacherProvider from './context/providers/TeacherProvider';
import Error from './pages/Error';

Chart.register(...registerables);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        networkMode: 'offlineFirst',
      },
      queries: {
        networkMode: 'offlineFirst',
      },
    },
  });
  const { reset } = useQueryErrorResetBoundary();

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={Error} onReset={reset}>
        <UserProvider>
          <ThemeProvider>
            <SchoolSessionProvider>
              <TeacherProvider>
                <StudentProvider>
                  <Scrollbars>
                    <Root />
                  </Scrollbars>
                </StudentProvider>
              </TeacherProvider>
            </SchoolSessionProvider>
          </ThemeProvider>
        </UserProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
