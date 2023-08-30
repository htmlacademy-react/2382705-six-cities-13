import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { getAuthStatus } from '../../store/user-data/selectors';
import { addFavoritesAction, deleteFavoritesAction } from '../../store/api-actions';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../types/authorization';


type BookmarkButtonProps = {
  id: string;
  isActive: boolean;
};

function BookmarkButtonSmall({id, isActive}: BookmarkButtonProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(getAuthStatus);

  const handleClick = () => {
    if (isAuthorized !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }
    if (isActive) {
      dispatch(deleteFavoritesAction(id));
    } else {
      dispatch(addFavoritesAction(id));
    }
  };

  return (
    <button className={classNames('place-card__bookmark-button', 'button', {
      'place-card__bookmark-button--active': isActive && isAuthorized === AuthorizationStatus.Auth
    })} type="button" onClick={handleClick}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isActive && isAuthorized === AuthorizationStatus.Auth ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}

export default BookmarkButtonSmall;
