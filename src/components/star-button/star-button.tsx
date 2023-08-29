import { ChangeEvent } from 'react';

export type StarButtonDetailsType = {
  value: number;
  title: string;
}

type StarButtonProps = {
  details: StarButtonDetailsType;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean | undefined;
  isFormDisabled: boolean;
};

function StarButton({details, onChangeHandler, isChecked, isFormDisabled}: StarButtonProps): JSX.Element {
  return (
    <>
      <input disabled={isFormDisabled} className="form__rating-input visually-hidden" checked={isChecked} onChange={onChangeHandler} name="rating" value={details.value} id={`${details.value}-stars`} type="radio" />
      <label htmlFor={`${details.value}-stars`} className="reviews__rating-label form__rating-label" title={details.title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default StarButton;
