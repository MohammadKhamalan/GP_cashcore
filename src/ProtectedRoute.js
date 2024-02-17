import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, isAuthorized, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        isAuthorized ? (
          <Component />
        ) : (
          <Navigate to="/" replace /> // Redirect to login page if not authorized
        )
      }
    />
  );
};

export default ProtectedRoute;