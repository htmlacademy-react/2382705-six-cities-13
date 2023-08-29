import { Comment } from '../../types/comment.ts';
import { sorting } from '../../utils/sorting-comments.ts';
import Review from '../review/review.tsx';

type ReviewListProps = {
  comments: Comment[];
};

const ReviewList = ({comments}: ReviewListProps): JSX.Element => {
  const newComments = sorting(comments).slice(0, 10);
  return (
    <ul className="reviews__list">
      {newComments.map((comment, commentId) => {
        const keyValue = `${commentId}-review`;
        return (
          <Review key={keyValue} comment={comment} />
        );
      })}
    </ul>
  );
};
export default ReviewList;
