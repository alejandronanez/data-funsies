import { formatNumbersToLocaleString } from 'utils/numbers';

interface Props {
  firstColumnName: string;
  secondColumnName: string;
  tableName: string;
  data: { [key: string]: any };
}

export function Table({
  firstColumnName,
  secondColumnName,
  data,
  tableName,
}: Props) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <p className="mb-4 font-semibold capitalize text-gray-600">
            {tableName}
          </p>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {firstColumnName}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {secondColumnName}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((datum, datumId) => (
                  <tr
                    key={datumId}
                    className={datumId % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {datum[firstColumnName]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatNumbersToLocaleString(datum[secondColumnName])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
