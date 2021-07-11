export type BookGenre = 'nonFiction' | 'fiction';
export type BookGenreIndexes<T> = { [Property in BookGenre]?: T };
export type YearItBecameBestSeller =
  | 2009
  | 2010
  | 2011
  | 2012
  | 2013
  | 2014
  | 2015
  | 2016
  | 2017
  | 2018
  | 2019;

export type YearIndexes<T> = { [Property in YearItBecameBestSeller]?: T };
export interface BestSeller {
  name: string;
  author: string;
  userRating: number;
  reviews: number;
  price: number;
  year: YearItBecameBestSeller;
  genre: BookGenre;
}
