import { InferGetStaticPropsType } from 'next';
import {
  getBooksPerYear,
  getMostReviewedBook,
  getMostReviewsPerGenre,
  getTotalBooksPerGenre,
} from 'dataProcessing/data';
import { bestSellers } from 'rawData/bestsellers';
/* This example requires Tailwind CSS v2.0+ */
import { PromotionalBanner } from 'components/PromotionalBanner/PromotionalBanner';

export default function Home({
  booksPerYear,
  datasetSize,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <PromotionalBanner datasetsSize={datasetSize} />
          <pre>{JSON.stringify(booksPerYear, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
export const getStaticProps = async () => {
  return {
    props: {
      booksPerYear: getBooksPerYear(bestSellers),
      mostReviewedBook: getMostReviewedBook(bestSellers),
      totalBooksPerGenre: getTotalBooksPerGenre(bestSellers),
      mostReviewsPerGenre: getMostReviewsPerGenre(bestSellers),
      datasetSize: bestSellers.length,
    },
  };
};
