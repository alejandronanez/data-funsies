import { InferGetStaticPropsType } from 'next';
import {
  getBooksPerYear,
  getMostReviewedBook,
  getMostReviewsPerGenre,
  getTotalBooksPerGenre,
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
