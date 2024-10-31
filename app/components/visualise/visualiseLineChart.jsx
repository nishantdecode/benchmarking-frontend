import React, { forwardRef } from "react";
import { useTheme } from "next-themes";
import useMediaQuery from "@/app/hooks/useMediaQuery";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const tooltip = {
  enabled: true,
  backgroundColor: "#fff",
  titleColor: "#000",
  bodyColor: "#000",
};

const darkTooltip = {
  enabled: true,
  backgroundColor: "#000",
  titleColor: "#fff",
  bodyColor: "#fff",
};

const VisualiseLineChart = forwardRef(function VisualiseLineChart(
  {
    data,
    colors,
    xAxis,
    legend = false,
    dataFormatter = function (value, index, ticks) {
      return value.toFixed(2);
    },
  },
  ref
) {
  const { theme } = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 500px)");
  ChartJS.defaults.color = theme === "dark" ? "#fff" : "#000";
  ChartJS.defaults.borderColor = "rgba(0,0,0,0)";
  ChartJS.defaults.backgroundColor = "rgba(1,1,1,1)";
  const fields = Object.keys(data[0]);
  const index = fields[0];
  const categories = fields.slice(1, fields.length);
  if (!colors) {
    return null;
  }
  const chartData = {
    labels: data.map((data) => data[index]),
    datasets: categories.map((category, ind) => {
      return {
        label: category,
        data: data.map((dataObj) => dataObj[category]),
        backgroundColor: [colors[ind]],
        borderColor: [colors[ind]],
        borderWidth: 2,
        color: [colors[ind]],
        pointStyle: "circle",
        pointBorderColour: "rgba(75,192,192,1)",
        pointHitRadius: 10,
        pointRadius: 0,
        tension: 0,
      };
    }),
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: legend,
        align: "center",
        labels: {
          color: theme === "dark" ? "#fff" : "#000",
          font: {
            size: 12,
          },
        },
        position: "top",
      },
      tooltip: theme === "dark" ? tooltip : darkTooltip,
    },
    scales: {
      y: {
        grid: {
          color: theme === "dark" ? "#fff" : "#000",
          lineWidth: 0.5,
        },
        tick: {
          display: false,
        },
        ticks: {
          callback: dataFormatter,
        },
      },
      x: {
        display: !isSmallScreen && xAxis,
        grid: {
          display: false,
        },
      },
    },
  };
  return <Line ref={ref} data={chartData} options={options} />;
});

export default VisualiseLineChart;
