import { BarChart } from "@tremor/react";

export function VisualiseBar({data, index, categories, dataFormatter}) {
  return (
    <>
      <BarChart
        className="mt-6"
        data={data}
        index={index}
        categories={categories}
        colors={['indigo', 'rose', 'teal', 'lime', 'zinc', 'orange', 'amber', 'cyan', 'fuchsia', 'yellow', 'red', 'green', 'blue']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </>
  );
}
