import { BestSeller } from 'types/types';
import {
  getTotalBooksPerYear,
  groupBooksByGenre,
} from 'dataProcessing/transformers';

export const getBooksPerYear = (books: BestSeller[]) => {
  const { fiction, nonFiction } = groupBooksByGenre(books);

  return {
    fiction: getTotalBooksPerYear(fiction),
    nonFiction: getTotalBooksPerYear(nonFiction),
  };
};
