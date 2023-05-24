import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('accesstoken')
    ? localStorage.getItem('accesstoken')
    : '';
  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};
