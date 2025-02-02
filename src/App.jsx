
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import AppLayout from './layouts/app.layout.jsx';
import LandingPage from './pages/landing.jsx';
import Auth from './pages/auth.jsx';
import Dashboard from './pages/dashboard';
import Link from './pages/link.jsx';
import RedirectLink from './pages/redirect-link.jsx';
import UrlProvider from './context';
import RequireAuth from './components/require-auth';



const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/dashboard',
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/link/:id',
        element: (
          <RequireAuth>
           <Link />
          </RequireAuth>
        ),
      },
      {
        path: '/:id',
        element: <RedirectLink />
      }
    ]
  }
]);

function App() {
  return (
    
    <UrlProvider>
       <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;