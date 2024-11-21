import React, { Children } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((store) => store.user);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};
export const AuthenticatedUser = ({ children }) => {
  const { currentUser } = useSelector((store) => store.user);
  console.log(currentUser, 'from privat route');
  if (currentUser) {
    return <Navigate to="/" />;
  }

  return children;
};
