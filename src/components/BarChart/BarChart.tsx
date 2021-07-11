import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryTheme,
} from 'victory';
import { formatNumbersToLocaleString } from 'utils/numbers';

export function BarChart({
  data,
  x,
  y,
  title,
}: {
  data: any;
  x: string;
  y: string;
  title: string;
}) {
  return (
    <VictoryChart
      domainPadding={30}
      height={300}
      width={460}
      theme={VictoryTheme.material}
    >
      <VictoryAxis
        style={{
          tickLabels: {
            fontSize: 8,
          },
        }}
      />
      <VictoryAxis style={{ tickLabels: { fontSize: 6 } }} dependentAxis />
      <VictoryBar
        animate={{ duration: 2000, onLoad: { duration: 1000 } }}
        style={{ data: { fill: '#fde68a' }, labels: { fontSize: 8 } }}
        data={data}
        labels={({ datum }) => formatNumbersToLocaleString(datum[y])}
        x={x}
        y={y}
        containerComponent={<VictoryContainer title={title} />}
        barWidth={10}
      />
    </VictoryChart>
  );
}
