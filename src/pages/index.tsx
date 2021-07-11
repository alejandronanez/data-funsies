import { InferGetStaticPropsType } from 'next';
import {
  getBooksPerYear,
  getMostReviewedBook,
  getMostReviewsPerGenre,
  getTotalBooksPerGenre,
  getPopularAuthorsByReview,
  getPopularAuthorsByRevenew,
} from 'dataProcessing/data';
import { bestSellers } from 'rawData/bestsellers';
import { PromotionalBanner } from 'components/PromotionalBanner/PromotionalBanner';
import { Section } from 'components/Layout/Section';
import { DidYouKnow } from 'components/DidYouKnow/DidYouKnow';

export default function Home({
  datasetSize,
  mostReviewedBook,
  mostReviewsPerGenre,
  totalBooksPerGenre,
  newDataSet,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <PromotionalBanner datasetsSize={datasetSize} />
          <Section>
            <DidYouKnow
              bookName={mostReviewedBook.name}
              author={mostReviewedBook.author}
              totalReviews={mostReviewedBook.reviews}
              fictionTotalReviews={mostReviewsPerGenre.fiction}
              nonFictionTotalReviews={mostReviewsPerGenre.nonFiction}
              fictionBestSellers={totalBooksPerGenre.fiction}
              totalBooks={datasetSize}
              nonFictionBestSellers={totalBooksPerGenre.nonFiction}
            />
          </Section>
          <h2 className="text-4xl font-bold ">
            Let&apos;s explore some author&apos;s data
          </h2>
        </div>
      </div>
    </div>
  );
}
export const getStaticProps = async () => {
  const totalBooksPerGenre = getTotalBooksPerGenre(bestSellers);

  return {
    props: {
      // TODO: Use this somewhere else?
      booksPerYear: getBooksPerYear(bestSellers),
      mostReviewedBook: getMostReviewedBook(bestSellers),
      totalBooksPerGenre,
      mostReviewsPerGenre: getMostReviewsPerGenre(bestSellers),
      datasetSize: bestSellers.length,
      newDataSet: {
        'top-10-authors-by-reviews': {
          collectionLabel: 'Top 10 authors by reviews',
          collectionId: 'top-10-authors-by-reviews',
          chartData: {
            x: 'author',
            y: 'total',
            data: getPopularAuthorsByReview({ books: bestSellers }),
          },
        },
        'bottom-10-authors-by-reviews': {
          collectionLabel: 'Bottom 10 authors by reviews',
          collectionId: 'bottom-10-authors-by-reviews',
          chartData: {
            x: 'author',
            y: 'total',
            data: getPopularAuthorsByReview({
              books: bestSellers,
              order: 'ASC',
            }),
          },
        },
        'top-10-authors-by-earnings': {
          collectionLabel: 'Top 10 authors by earnings',
          collectionId: 'top-10-authors-by-earnings',
          chartData: {
            x: 'author',
            y: 'total',
            data: getPopularAuthorsByRevenew({ books: bestSellers }),
          },
        },
        'bottom-10-authors-by-earnings': {
          collectionLabel: 'Bottom 10 authors by earnings',
          collectionId: 'bottom-10-authors-by-earnings',
          chartData: {
            x: 'author',
            y: 'total',
            data: getPopularAuthorsByRevenew({
              books: bestSellers,
              order: 'ASC',
            }),
          },
        },
        'top-10-authors-with-more-bestsellers': {
          collectionLabel: 'Top 10 authors with more bestsellers',
          collectionId: 'top-10-authors-with-more-bestsellers',
          chartData: {
            x: '',
            y: '',
            data: [],
          },
        },
        'bottom-10-authors-with-more-bestsellers': {
          collectionLabel: 'Bottom 10 authors with more bestsellers',
          collectionId: 'bottom-10-authors-with-more-bestsellers',
          chartData: {
            x: '',
            y: '',
            data: [],
          },
        },
      },
      dataset: [
        {
          genre: 'Fiction',
          value: totalBooksPerGenre.fiction,
          label: totalBooksPerGenre.fiction,
        },
        {
          genre: 'Non-Fiction',
          value: totalBooksPerGenre.nonFiction,
          label: totalBooksPerGenre.nonFiction,
        },
      ],
    },
  };
};
