import { groupBy, countBy } from 'lodash';
import { BestSeller, YearIndexes } from 'types/types';

export function groupBooksByGenre(books: BestSeller[]) {
  const { fiction, nonFiction } = groupBy(books, 'genre');

  return {
    fiction,
    nonFiction,
  };
}

export function getTotalBooksPerYear(books: BestSeller[]) {
  return countBy(books, 'year') as YearIndexes<number>;
}
