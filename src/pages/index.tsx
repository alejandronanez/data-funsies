import { InferGetStaticPropsType } from 'next';
import {
  getMostReviewedBook,
  getMostReviewsPerGenre,
  getTotalBooksPerGenre,
  getPopularAuthorsByReview,
  getPopularAuthorsByRevenue,
  getAuthorsByBestSeller,
} from 'dataProcessing/data';
import { bestSellers } from 'rawData/bestsellers';
import { PromotionalBanner } from 'components/PromotionalBanner/PromotionalBanner';
import { Section } from 'components/Layout/Section';
import { DidYouKnow } from 'components/DidYouKnow/DidYouKnow';
import { DynamicChart } from 'components/DynamicChart/DynamicChart';

export default function Home({
  datasetSize,
  mostReviewedBook,
  mostReviewsPerGenre,
  totalBooksPerGenre,
  dataset,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <PromotionalBanner datasetsSize={datasetSize} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-3xl mx-auto">
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
          <DynamicChart options={dataset} />
        </div>
      </div>
    </div>
  );
}
export const getStaticProps = async () => {
  const totalBooksPerGenre = getTotalBooksPerGenre(bestSellers);

  return {
    props: {
      mostReviewedBook: getMostReviewedBook(bestSellers),
      totalBooksPerGenre,
      mostReviewsPerGenre: getMostReviewsPerGenre(bestSellers),
      datasetSize: bestSellers.length,
      dataset: [
        {
          collectionLabel: '5 Authors with more reviews',
          collectionId: 'top-5-authors-by-reviews',
          chartData: {
            x: 'author',
            y: 'total',
            data: getPopularAuthorsByReview({ books: bestSellers }),
          },
        },
        {
          collectionLabel: '5 Authors with fewer reviews',
          collectionId: 'bottom-5-authors-by-reviews',
          chartData: {
            x: 'author',
            y: 'total',
            data: getPopularAuthorsByReview({
              books: bestSellers,
              order: 'ASC',
            }),
          },
        },
        {
          collectionLabel: '5 Authors with more earnings',
          collectionId: 'top-5-authors-by-earnings',
          chartData: {
            x: 'author',
            y: 'total',
            data: getPopularAuthorsByRevenue({ books: bestSellers }),
          },
        },
        {
          collectionLabel: '5 Authors with less earnings',
          collectionId: 'bottom-5-authors-by-earnings',
          chartData: {
            x: 'author',
            y: 'total',
            data: getPopularAuthorsByRevenue({
              books: bestSellers,
              order: 'ASC',
            }),
          },
        },

        {
          collectionLabel: '5 Authors with more bestsellers',
          collectionId: 'top-5-authors-with-more-bestsellers',
          chartData: {
            x: 'author',
            y: 'total',
            data: getAuthorsByBestSeller({ books: bestSellers }),
          },
        },
        {
          collectionLabel: '5 authors with fewer bestsellers',
          collectionId: 'bottom-5-authors-with-fewer-bestsellers',
          chartData: {
            x: 'author',
            y: 'total',
            data: getAuthorsByBestSeller({ books: bestSellers, order: 'ASC' }),
          },
        },
      ],
    },
  };
};
