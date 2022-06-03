import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  // TODO: replace causes refresh which clears redux store
  // Save entire state to localStorage?
  // const { isAuthenticated } = useSelector(userSelector);
  // Should check here for valid token
  const isAuthenticated = localStorage.getItem('isAuthenticated') || false;
  console.log(isAuthenticated, 'in Private Route');

  if(!isAuthenticated){
    return <Navigate to='/login' replace state={{ from: location }} />
  }

  return children;
};

export default PrivateRoute;