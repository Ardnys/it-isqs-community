import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../views/AppLayout';
import { Authentication } from '../views/Auth';
import Blogs from '../views/Blogs';
import Forum from '../views/Forum';
import Materials from '../views/Materials';
import SignUp from '../views/SignUp';
import { BlogDetail } from '../views/BlogDetail';
import { Home } from '../views/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/materials',
        element: <Materials />,
      },
      {
        path: '/blogs',
        element: <Blogs />,
      },
      {
        path: '/blogs/:id',
        element: <BlogDetail />,
      },
      {
        path: '/forum',
        element: <Forum />,
      },
    ],
  },

  {
    path: '/auth',
    element: <Authentication />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);
