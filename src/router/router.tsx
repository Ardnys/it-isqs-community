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
import Foru from '../views/Foru';
import ForuCreate from '../views/ForuCreate';
import ContactPage from '../views/ContactPage';

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
        path: '/forum/:id',
        element: <Foru />,
      },
      {
        path: '/blog-edit',
        element: <BlogEdit />,
      },
      { path: '/forum/create', element: <ForuCreate /> },

      {
        path: '/contact',
        element: <ContactPage />,
        errorElement: <div>Something went wrong. Please try again.</div>,

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
