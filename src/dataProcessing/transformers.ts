import { groupBy, countBy, entries } from 'lodash';
import {
  BestSeller,
  BookGenreIndexes,
  Years,
  YearValuePair,
} from 'types/types';

export function groupBooksByGenre(
  books: BestSeller[],
): BookGenreIndexes<BestSeller[]> {
  const { fiction, nonFiction } = groupBy(books, 'genre');

  return {
    fiction,
    nonFiction,
  };
}

export function getTotalBooksPerYear(books: BestSeller[]): YearValuePair[] {
  const booksPerYear = countBy(books, 'year');

  return entries(booksPerYear).map(([year, value]) => ({
    // TS complains about the fact that `year` is not a number anymore as it's
    // coming from an object, so it assumes the key is a string.
    year: +year as Years,
    value,
  }));
}
