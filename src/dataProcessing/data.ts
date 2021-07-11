import { BestSeller } from 'types/types';
import {
  maxReviewsForBooks,
  totalBooksPerYear,
  groupBooksByGenre,
  totalBooksPerGenre,
  mostReviewsPerGenre,
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
