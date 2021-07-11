import { countBy, groupBy, map, maxBy, sumBy, uniqBy } from 'lodash';
import { BestSeller } from 'types/types';

const uniqueBooksByAuthor = (books: BestSeller[]) =>
  groupBy(uniqBy(books, 'name'), 'author');

export function maxReviewsForBooks(books: BestSeller[]) {
  return maxBy(books, 'reviews');
}

export function totalBooksPerGenre(books: BestSeller[]) {
  const { fiction, nonFiction } = countBy(books, 'genre');

  return {
    fiction,
    nonFiction,
  };
}

export function mostReviewsPerGenre(books: BestSeller[]) {
  const { fiction, nonFiction } = groupBy(books, 'genre');
  const totalFictionReviews = sumBy(uniqBy(fiction, 'name'), 'reviews');
  const totalNonFictionReviews = sumBy(uniqBy(nonFiction, 'name'), 'reviews');

  return {
    nonFiction: totalNonFictionReviews,
    fiction: totalFictionReviews,
  };
}

export const getAuthorsAndReviews = (
  books: BestSeller[],
): Array<{ author: string; total: number }> => {
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

export const getAuthorsByRevenue = (books: BestSeller[]) => {
  const authorBooks = uniqueBooksByAuthor(books);

  return map(authorBooks, (book) => {
    const totalSold = sumBy(book, (book) => book.price * book.reviews);
    return {
      author: book[0].author,
      total: totalSold,
    };
  });
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
