import { BestSeller } from 'types/types';
import {
  maxReviewsForBooks,
  totalBooksPerYear,
  groupBooksByGenre,
  totalBooksPerGenre,
  mostReviewsPerGenre,
  getAuthorsAndReviews,
  sortAndTake,
  getAuthorsByRevenew,
  getBooksByAuthor,
} from 'dataProcessing/transformers';

type MostReviewedBook = {
  name: string;
  reviews: number;
  price: number;
  author: string;
};

export const getBooksPerYear = (books: BestSeller[]) => {
  const { fiction, nonFiction } = groupBooksByGenre(books);

  return {
    fiction: totalBooksPerYear(fiction),
    nonFiction: totalBooksPerYear(nonFiction),
  };
};

export const getMostReviewedBook = (books: BestSeller[]): MostReviewedBook => {
  const { author, name, price, reviews } = maxReviewsForBooks(books);

  return {
    author,
    name,
    price,
    reviews,
  };
};

export const getTotalBooksPerGenre = (books: BestSeller[]) => {
  return totalBooksPerGenre(books);
};

export const getMostReviewsPerGenre = (books: BestSeller[]) => {
  const { nonFiction, fiction } = mostReviewsPerGenre(books);

  return {
    fiction,
    nonFiction,
  };
};

export const getPopularAuthorsByReview = ({
  books,
  limit = 10,
  order = 'DESC',
}: {
  books: BestSeller[];
  limit?: number;
  order?: 'DESC' | 'ASC';
}) => {
  const authorsAndReviews = getAuthorsAndReviews(books);
  return sortAndTake({
    collection: authorsAndReviews,
    order,
    keyToOrderBy: 'total',
    limit,
  });
};

export const getPopularAuthorsByRevenew = ({
  books,
  limit = 10,
  order = 'DESC',
}: {
  books: BestSeller[];
  limit?: number;
  order?: 'DESC' | 'ASC';
}) => {
  const authorsByRevenew = getAuthorsByRevenew(books);
  return sortAndTake({
    collection: authorsByRevenew,
    order,
    keyToOrderBy: 'total',
    limit,
  });
};

export const getAuthorsByBestSeller = ({
  books,
  limit = 10,
  order = 'DESC',
}: {
  books: BestSeller[];
  limit?: number;
  order?: 'DESC' | 'ASC';
}) => {
  const booksByAuthor = getBooksByAuthor(books);
  return sortAndTake({
    collection: booksByAuthor,
    order,
    keyToOrderBy: 'total',
    limit,
  });
};
