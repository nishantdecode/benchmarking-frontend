import { SparkAreaChart } from '@tremor/react';

const chartdata = [
  {
    month: 'Jan 21',
    Performance: 4000,
  },
  {
    month: 'Feb 21',
    Performance: 3000,
  },
  {
    month: 'Mar 21',
    Performance: 2000,
  },
  {
    month: 'Apr 21',
    Performance: 2780,
  },
  {
    month: 'May 21',
    Performance: 1890,
  },
  {
    month: 'Jun 21',
    Performance: 2390,
  },
  {
    month: 'Jul 21',
    Performance: 3490,
  },
];

export function VisualizeSpark({data, categories, index, color}) {
  return (
      <SparkAreaChart
        data={data}
        categories={categories}
        index={index}
        colors={[color]}
        className="h-8 w-20 sm:h-5"
      />
  );
}