import { BestSeller, Order } from 'types/types';
import {
  maxReviewsForBooks,
  totalBooksPerGenre,
  mostReviewsPerGenre,
  getAuthorsAndReviews,
  getAuthorsByRevenue,
  getBooksByAuthor,
} from 'dataProcessing/transformers';
import { sortAndTake } from 'dataProcessing/utils';

interface getAuthorsDataFnParams {
  books: BestSeller[];
  limit?: number;
  order?: Order;
}

export const getMostReviewedBook = (books: BestSeller[]) => {
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
  limit = 5,
  order = 'DESC',
}: getAuthorsDataFnParams) => {
  const authorsAndReviews = getAuthorsAndReviews(books);
  return sortAndTake({
    collection: authorsAndReviews,
    order,
    keyToOrderBy: 'total',
    limit,
  });
};

export const getPopularAuthorsByRevenue = ({
  books,
  limit = 5,
  order = 'DESC',
}: getAuthorsDataFnParams) => {
  const authorsByRevenew = getAuthorsByRevenue(books);
  return sortAndTake({
    collection: authorsByRevenew,
    order,
    keyToOrderBy: 'total',
    limit,
  });
};

export const getAuthorsByBestSeller = ({
  books,
  limit = 5,
  order = 'DESC',
}: getAuthorsDataFnParams) => {
  const booksByAuthor = getBooksByAuthor(books);
  return sortAndTake({
    collection: booksByAuthor,
    order,
    keyToOrderBy: 'total',
    limit,
  });
};
