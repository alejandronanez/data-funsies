import { groupBy, countBy } from 'lodash';
import { BestSeller, BookGenreIndexes, YearIndexes } from 'types/types';

export function groupBooksByGenre(
  books: BestSeller[],
): BookGenreIndexes<BestSeller[]> {
  const { fiction, nonFiction } = groupBy(books, 'genre');

  return {
    fiction,
    nonFiction,
  };
}

export function getTotalBooksPerYear(books: BestSeller[]): YearIndexes<number> {
  return countBy(books, 'year');
}
