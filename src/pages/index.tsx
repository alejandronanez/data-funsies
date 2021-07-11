import { InferGetStaticPropsType } from 'next';
import { getBooksPerYear } from 'dataProcessing/data';
import { bestSellers } from 'rawData/bestsellers';

export default function Home({
  booksPerYear,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <pre>{JSON.stringify(booksPerYear, null, 2)}</pre>
    </>
  );
}
export const getStaticProps = async () => {
  if (!bestSellers.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      booksPerYear: getBooksPerYear(bestSellers),
    },
  };
};
