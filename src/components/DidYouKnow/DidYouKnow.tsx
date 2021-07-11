import { Highlight, Text } from 'components/Typography/Typography';
import { formatNumbersToLocaleString } from 'utils/numbers';

export function DidYouKnow({
  bookName,
  author,
  totalReviews,
  fictionBestSellers,
  fictionTotalReviews,
  nonFictionBestSellers,
  nonFictionTotalReviews,
  totalBooks,
}: {
  bookName: string;
  author: string;
  totalReviews: number;
  fictionTotalReviews: number;
  nonFictionTotalReviews: number;
  fictionBestSellers: number;
  totalBooks: number;
  nonFictionBestSellers: number;
}) {
  return (
    <>
      <Text>
        💡 Did you know that the <Highlight>most reviewed book was</Highlight>{' '}
        <Highlight isLink>{bookName}</Highlight>, by{' '}
        <Highlight isLink>{author}</Highlight> with{' '}
        <Highlight>{formatNumbersToLocaleString(totalReviews)}</Highlight>{' '}
        reviews?
      </Text>
      <Text>
        🛸 Also, <Highlight isLink>Fiction books</Highlight> got{' '}
        <Highlight>
          {formatNumbersToLocaleString(fictionTotalReviews)}
        </Highlight>{' '}
        total reviews, and <Highlight isLink>Non-Fiction</Highlight> got{' '}
        <Highlight>
          {formatNumbersToLocaleString(nonFictionTotalReviews)}
        </Highlight>{' '}
        total reviews from 2009 to 2019.
      </Text>
      <Text>
        📊 Another fun fact, is that{' '}
        <Highlight>{formatNumbersToLocaleString(fictionBestSellers)}</Highlight>{' '}
        out of the{' '}
        <Highlight>{formatNumbersToLocaleString(totalBooks)}</Highlight>{' '}
        Bestsellers were <Highlight isLink>Fiction books</Highlight> and the
        remaining{' '}
        <Highlight>
          {formatNumbersToLocaleString(nonFictionBestSellers)}
        </Highlight>{' '}
        were <Highlight isLink>Non-Fiction books</Highlight>
      </Text>
    </>
  );
}
