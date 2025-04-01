import { createBrowserRouter } from 'react-router-dom';
import { ProtectedPath } from '../components/ProtectedPath';
import { Authentication } from '../views/Auth';
import TabContent from '../components/PageContainer';
import { AppLayout } from '../components/layouts/AppLayout';
import { AuthSignUp } from '../views/AuthSignUp';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedPath redirectUrl="/auth">
        <AppLayout />
      </ProtectedPath>
    ),
    children: [
      {
        path: '/', // Main App component
        element: <TabContent />,
      },
      {
        path: 'tabs/:tabValue', // Dynamic route for tabs
        element: <TabContent />, // Use TabContent for tab navigation
      },
    ],
  },
  {
    path: '/auth', // Authentication route
    element: <Authentication />,
  },
  {
    path: '/signup', // Sign-up route
    element: <AuthSignUp />, // Your SignUp component
  },
]);
