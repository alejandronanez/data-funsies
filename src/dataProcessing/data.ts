import { BestSeller } from 'types/types';
import {
  getTotalBooksPerYear,
  groupBooksByGenre,
} from 'dataProcessing/transformers';

const booksPerYear = (books: BestSeller[]) => {
  const { fiction, nonFiction } = groupBooksByGenre(books);

  return {
    fiction: getTotalBooksPerYear(fiction),
    nonFiction: getTotalBooksPerYear(nonFiction),
  };
};
