import { useState, ChangeEvent, useEffect } from 'react';
import { BarChart } from 'components/BarChart/BarChart';
import { Table } from 'components/Table/Table';

interface ChartData {
  x: string;
  y: string;
  data: Array<{ [key: string]: any }>;
}

interface Option {
  collectionLabel: string;
  collectionId: string;
  chartData: ChartData;
}

interface Props {
  options: Array<Option>;
}

export function DynamicChart({ options }: Props) {
  const [optionIndexSelected, setOptionIndexSelected] = useState(
    options[0]?.collectionId,
  );
  const [optionSelected, setOptionSelected] = useState<null | Option>();

  useEffect(() => {
    const newOption = options.find(
      (option) => option.collectionId === optionIndexSelected,
    );
    setOptionSelected(newOption);
  }, [optionIndexSelected]);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    setOptionIndexSelected(event.target.value);
  }

  return (
    <div className="my-12">
      <form>
        <label
          htmlFor="datasets"
          className="block text-sm font-medium text-gray-700"
        >
          Let&apos;s explore some data
        </label>
        <select
          onChange={handleChange}
          id="datasets"
          name="datasets"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {options.map((optionKey) => (
            <option key={optionKey.collectionId} value={optionKey.collectionId}>
              {optionKey.collectionLabel}
            </option>
          ))}
        </select>
      </form>
      {optionSelected ? (
        <>
          <BarChart
            data={optionSelected.chartData.data}
            x={optionSelected.chartData.x}
            y={optionSelected.chartData.y}
            title={optionSelected.collectionLabel}
          />
          <Table
            firstColumnName={optionSelected.chartData.x}
            secondColumnName={optionSelected.chartData.y}
            data={optionSelected.chartData.data}
          />
        </>
      ) : null}
    </div>
  );
}
