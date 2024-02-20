import { DonutChart } from "@tremor/react";

export const VisualiseDonut = ({data, dataFormatter}) => (
  <DonutChart
    data={data}
    variant="donut"
    valueFormatter={dataFormatter}
    onValueChange={(v) => console.log(v)}
    colors={['indigo', 'rose', 'teal', 'lime', 'zinc', 'orange', 'amber', 'cyan', 'fuchsia', 'yellow', 'red', 'green', 'blue']}
    className="w-[500px] h-[500px]"
  />
);
