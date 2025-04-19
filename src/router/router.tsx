import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../views/AppLayout';
import { Authentication } from '../views/Auth';
import Blogs from '../views/Blogs';
import Forum from '../views/Forum';
import Home from '../views/Home';
import Materials from '../views/Materials';
import SignUp from '../views/SignUp';
import BlogEdit from '../views/BlogEdit';
import BlogDetail from '../views/BlogDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
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
      {
        path: '/blog-edit',
        element: <BlogEdit />,
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
