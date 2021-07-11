import {
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryTheme,
} from 'victory';

export function BarChart({
  data,
  x,
  y,
  title,
}: {
  [key: string]: any;
  x: string;
  y: string;
  title: string;
}) {
  return (
    <VictoryChart domainPadding={30} theme={VictoryTheme.material}>
      <VictoryBar
        style={{ data: { fill: '#fde68a' } }}
        data={data}
        x={x}
        y={y}
        containerComponent={<VictoryContainer title={title} />}
      />
    </VictoryChart>
  );
}
