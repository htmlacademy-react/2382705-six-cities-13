import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-data/selectors';
import classNames from 'classnames';
import { AuthorizationStatus } from '../../types/authorization';
import { addFavoritesAction, deleteFavoritesAction } from '../../store/api-actions';

type BookmarkButtonProps = {
  id?: string;
  isActive: boolean;
};

function BookmarkButtonBig({id, isActive}: BookmarkButtonProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(getAuthStatus);

  const handleClick = () => {
    if (isAuthorized !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }
    if(isActive) {
      dispatch(deleteFavoritesAction(id));
    } else {
      dispatch(addFavoritesAction(id));
    }
  };

  return (
    <button className={classNames('offer__bookmark-button', 'button', {
      'offer__bookmark-button--active': isActive && isAuthorized
    })} type="button" onClick={handleClick}
    >
      <svg className="offer__bookmark-icon" width="31" height="33">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isActive && isAuthorized ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}

export default BookmarkButtonBig;
