import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../types/authorization';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-data/selectors';
import { useEffect } from 'react';
import { store } from '../../store';
import { checkAuthAction } from '../../store/api-actions';

type PrivateRouteProps = {
  isAuth: AuthorizationStatus;
  children: JSX.Element;
};

function PrivateRoute (props: PrivateRouteProps): JSX.Element {
  const {children, isAuth} = props;
  const isAuthe = useAppSelector(getAuthStatus);

  useEffect(() => {
    store.dispatch(checkAuthAction());
  }, []);

  if (isAuth === AuthorizationStatus.Unknown) {
    return (
      <LoadingScreen />
    );
  }

  return (
    isAuthe === AuthorizationStatus.Auth
      ? children
      : <Navigate to = '/login' />
  );
}

export default PrivateRoute;
