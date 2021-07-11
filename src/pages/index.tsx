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
import { BarChart } from 'components/BarChart/BarChart';

export default function Home({
  datasetSize,
  mostReviewedBook,
  mostReviewsPerGenre,
  totalBooksPerGenre,
  totalBooksPerGenreDataset,
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
          <Section>
            <BarChart
              data={totalBooksPerGenreDataset}
              x="genre"
              y="value"
              title="Total books per year"
            />
          </Section>
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
      totalBooksPerGenreDataset: [
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
