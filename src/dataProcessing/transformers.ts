import {
  groupBy,
  countBy,
  entries,
  maxBy,
  sumBy,
  uniqBy,
  map,
  sortBy,
  take,
} from 'lodash';
import {
  BestSeller,
  BookGenreIndexes,
  Years,
  YearValuePair,
} from 'types/types';

interface AuthorAndReviews {
  author: string;
  total: number;
}

const orderCriteria = ({
  order,
  value,
}: {
  order: 'ASC' | 'DESC';
  value: number;
}) => (order === 'DESC' ? value * -1 : value);

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

const uniqueBooksByAuthor = (books: BestSeller[]) =>
  groupBy(uniqBy(books, 'name'), 'author');

export const getAuthorsAndReviews = (
  books: BestSeller[],
): Array<AuthorAndReviews> => {
  const authorBooks = uniqueBooksByAuthor(books);

  /**
   * Here we have a loop inside a loop. I don't really like it, but that's
   * what's available right now.
   */
  return map(authorBooks, (author) => {
    const totalReviews = sumBy(author, 'reviews');
    return {
      author: author[0].author,
      total: totalReviews,
    };
  });
};

export const getAuthorsByRevenew = (books: BestSeller[]) => {
  const authorBooks = uniqueBooksByAuthor(books);

  return map(authorBooks, (book) => {
    const totalSold = sumBy(book, (book) => book.price * book.reviews);
    return {
      author: book[0].author,
      total: totalSold,
    };
  });
};

export const sortAndTake = <T>({
  collection,
  limit = 10,
  order = 'DESC',
  keyToOrderBy,
}: {
  collection: T[];
  limit?: number;
  order?: 'ASC' | 'DESC';
  keyToOrderBy: string;
}): T[] => {
  const sortedCollection = sortBy(collection, (record) =>
    orderCriteria({ order, value: record[keyToOrderBy] }),
  );
  return take(sortedCollection, limit);
};

export const getBooksByAuthor = (books: BestSeller[]) => {
  const booksByAuthor = groupBy(books, 'author');
  return map(booksByAuthor, (author) => {
    return {
      author: author[0].author,
      total: author.length,
    };
  });
};
