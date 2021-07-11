import { Order } from 'types/types';
import { sortBy, take } from 'lodash';

const orderCriteria = ({ order, value }: { order: Order; value: number }) =>
  order === 'DESC' ? value * -1 : value;

export const sortAndTake = <T>({
  collection,
  limit = 10,
  order = 'DESC',
  keyToOrderBy,
}: {
  collection: T[];
  limit?: number;
  order?: Order;
  keyToOrderBy: string;
}): T[] => {
  const sortedCollection = sortBy(collection, (record) =>
    orderCriteria({ order, value: record[keyToOrderBy] }),
  );
  return take(sortedCollection, limit);
};
