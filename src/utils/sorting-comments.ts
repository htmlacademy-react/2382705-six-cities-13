import { Comment } from '../types/comment';

function sortByDate(a: Comment, b: Comment) {
  return Number(new Date(b.date)) - Number(new Date(a.date));
}

const sortComments = (comments: Comment[]): Comment[] => comments.slice().sort(sortByDate);

export { sortComments };
