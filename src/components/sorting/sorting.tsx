import { useState } from 'react';
import classNames from 'classnames';

import { SortingMap } from '../../constants/sorting';
import type { SortingType } from '../../types/sorting';

type SortingProps = {
  activeSorting: SortingType;
  onChange: (newSoorting: SortingType) => void;
};

function Sorting({activeSorting, onChange}: SortingProps) {
  const [isOpened, setIsOpened] = useState(false);

  const iconStyle = {
    transform: `translateY(-50%) ${isOpened ? 'rotate(180deg)' : ''}`,
  };

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpened) {
      event.preventDefault();
      setIsOpened(false);
    }
  }

  function handleTypeClick() {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  }

  function handleSortingItemClick(type: SortingType) {
    onChange(type);
    setIsOpened(false);
  }

  return (
    <form className="places__sorting" action="#" method="get" onKeyDown={handleKeydown}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleTypeClick}>
        {SortingMap[activeSorting]}
        <svg className="places__sorting-arrow" width="7" height="4" style={iconStyle}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames('places__options', 'places__options--custom', {
        'places__options--opened': isOpened,
      })}
      >
        {(
          Object.entries(SortingMap) as [
            SortingType,
            (typeof SortingMap) [SortingType]
          ] []
        ).map(([type, label]) => (
          <li key={type} className={classNames('places__option', {
            'places__option--active': activeSorting === type,
          })} tabIndex={0} onClick={() => handleSortingItemClick(type)}
          >{label}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
