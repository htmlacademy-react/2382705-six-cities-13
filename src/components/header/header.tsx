import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Logo from '../logo/logo';

import { checkAuthAction, logoutAction } from '../../store/api-actions.ts';
import { getAuthStatus, getUserInfo } from '../../store/user-data/selectors';
import { getFavorites } from '../../store/favorites-data/selectors.ts';

import { useAppSelector } from '../../hooks/index.ts';
import { AuthorizationStatus } from '../../types/authorization.ts';
import { useEffect } from 'react';
import { store } from '../../store/index.ts';

function Header(): JSX.Element {
  const isAuth = useAppSelector(getAuthStatus);
  const user = useAppSelector(getUserInfo);
  const favorites = useAppSelector(getFavorites);

  const dispatch = useDispatch();

  const signOutClickHandler = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    store.dispatch(checkAuthAction());
  }, [isAuth]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth !== AuthorizationStatus.Auth
                ?
                <li className="header__nav-item user">
                  <Link to='/login' className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
                :
                <>
                  <li className="header__nav-item user">
                    <Link to='/favorites' className="header__nav-link header__nav-link--profile" >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{user?.email}</span>
                      <span className="header__favorite-count">{favorites.length}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item" onClick={signOutClickHandler}>
                    <Link to='' className="header__nav-link">
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
