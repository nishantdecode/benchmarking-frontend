import { LineChart } from '@tremor/react';

export function VisualiseLine({height, data, index, categories, dataFormatter}) {
  return (
    <LineChart
      className={height}
      data={data}
      index={index}
      categories={categories}
      colors={['indigo', 'rose', 'teal', 'lime', 'zinc', 'orange', 'amber', 'cyan', 'fuchsia', 'yellow', 'red', 'green', 'blue']}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      onValueChange={(v) => console.log(v)}
    />
  );
}