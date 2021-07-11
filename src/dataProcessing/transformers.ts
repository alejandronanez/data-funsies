import { groupBy, countBy, entries, maxBy, sumBy, uniqBy } from 'lodash';
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

export function totalBooksPerYear(books: BestSeller[]): YearValuePair[] {
  const booksPerYear = countBy(books, 'year');

  return entries(booksPerYear).map(([year, value]) => ({
    // TS complains about the fact that `year` is not a number anymore as it's
    // coming from an object, so it assumes the key is a string.
    year: +year as Years,
    value,
  }));
}

export function maxReviewsForBooks(books: BestSeller[]): BestSeller {
  return maxBy(books, 'reviews');
}

export function totalBooksPerGenre(
  books: BestSeller[],
): BookGenreIndexes<number> {
  const { fiction, nonFiction } = countBy(books, 'genre');

  return {
    fiction,
    nonFiction,
  };
}

export function mostReviewsPerGenre(
  books: BestSeller[],
): BookGenreIndexes<number> {
  const { fiction, nonFiction } = groupBy(books, 'genre');
  const totalFictionReviews = sumBy(uniqBy(fiction, 'name'), 'reviews');
  const totalNonFictionReviews = sumBy(uniqBy(nonFiction, 'name'), 'reviews');

  return {
    nonFiction: totalNonFictionReviews,
    fiction: totalFictionReviews,
  };
}
