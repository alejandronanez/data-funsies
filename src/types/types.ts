type BookGenre = 'Non Fiction' | 'Fiction';
type YearItBecameBestSeller =
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

export interface BestSeller {
  name: string;
  author: string;
  userRating: number;
  reviews: number;
  price: number;
  year: YearItBecameBestSeller;
  genre: BookGenre;
}
