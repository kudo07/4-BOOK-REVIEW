import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import Book from './pages/Book';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { useSelector } from 'react-redux';
import { AuthenticatedUser, PrivateRoute } from './components/PrivateRoute';
import Search from './pages/Search';

const browserRouter = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        // <PrivateRoute>
        <MainLayout />
        // </PrivateRoute>
      ),

      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/book/:id',
          element: (
            // <PrivateRoute>
            <Book />
            // </PrivateRoute>
          ),
        },
        {
          path: '/search',
          element: (
            // <PrivateRoute>
            <Search />
            // </PrivateRoute>
          ),
        },
        {
          path: '/profile',
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: '/login',
      element: (
        <AuthenticatedUser>
          <SignIn />
        </AuthenticatedUser>
      ),
    },
    {
      path: '/signup',
      element: (
        <AuthenticatedUser>
          <SignUp />
        </AuthenticatedUser>
      ),
    },
  ],
  {
    future: {
      v7_partialHydration: true, // Opt-in for partial hydration
      v7_startTransition: true, // Opt-in for React.startTransition
      v7_skipActionErrorRevalidation: true, // Avoid revalidation after 4xx/5xx errors
      v7_relativeSplatPath: true, // Update relative path resolution within splat routes
      v7_fetcherPersist: true, // Update fetcher persistence behavior
      v7_normalizeFormMethod: true, // Normalize `formMethod` to uppercase
    },
  }
);

function App() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser, 'from the app.jsx');
  return (
    <>
      <RouterProvider
        future={{
          v7_startTransition: true,
        }}
        router={browserRouter}
      />
    </>
  );
}

export default App;
