import { InferGetStaticPropsType } from 'next';
import {
  getBooksPerYear,
  getMostReviewedBook,
  getMostReviewsPerGenre,
  getTotalBooksPerGenre,
} from 'dataProcessing/data';
import { bestSellers } from 'rawData/bestsellers';
import { PromotionalBanner } from 'components/PromotionalBanner/PromotionalBanner';
import { Highlight, Text } from 'components/Typography/Typography';
import { Section } from 'components/Layout/Section';

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
            <Text>
              💡 Did you know that the{' '}
              <Highlight>most reviewed book was</Highlight>{' '}
              <Highlight isLink>{mostReviewedBook.name}</Highlight>, by{' '}
              <Highlight isLink>{mostReviewedBook.author}</Highlight> with{' '}
              <Highlight>{mostReviewedBook.reviews}</Highlight> reviews.
            </Text>
            <Text>
              Also, <Highlight isLink>Fiction books</Highlight> got{' '}
              <Highlight>{mostReviewsPerGenre.fiction}</Highlight> total
              reviews, and <Highlight isLink>Non-Fiction</Highlight> got{' '}
              <Highlight>{mostReviewsPerGenre.nonFiction}</Highlight> total
              reviews from 2009 and 2019.
            </Text>
            <Text>
              Another fun fact, is that{' '}
              <Highlight>{totalBooksPerGenre.fiction}</Highlight> out of the{' '}
              <Highlight>{datasetSize}</Highlight> Bestsellers were{' '}
              <Highlight isLink>Fiction books</Highlight> and the remaining{' '}
              <Highlight>{totalBooksPerGenre.nonFiction}</Highlight> were{' '}
              <Highlight isLink>Non-Fiction books</Highlight>
            </Text>
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
