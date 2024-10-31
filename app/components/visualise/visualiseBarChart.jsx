import React, { forwardRef } from "react";
import { useTheme } from "next-themes";

import { darkenColor } from "@/util/rgbUtils";
import useMediaQuery from "@/app/hooks/useMediaQuery"

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
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

const VisualiseBarChart = forwardRef(function VisualiseBarChart({ data, colors, xAxis, dataFormatter }, ref) {
  const { theme } = useTheme();
  const isSmallScreen = useMediaQuery('(max-width: 500px)');
  ChartJS.defaults.color = theme === "dark" ? "#fff" : "#000";
  ChartJS.defaults.borderColor = "rgba(0,0,0,0)";
  ChartJS.defaults.backgroundColor = "rgba(75,192,192,1)";
  const fields = Object.keys(data[0]);
  const index = fields[0];
  const categories = fields.slice(1, fields.length);
  if(!colors || colors.length === 0) {
    return null;
  }
  const chartData = {
    labels: data.map((data) => data[index]),
    datasets: categories.map((category, ind) => {
      return {
        label: category,
        data: data.map((dataObj) => dataObj[category]),
        backgroundColor: [colors[ind] ? colors[ind] : darkenColor(colors[ind-1], 0.3)],
        borderColor: [colors[ind] ? colors[ind] : darkenColor(colors[ind-1], 0.3)],
        color: [colors[ind] ? colors[ind] : darkenColor(colors[ind-1], 0.3)],
        pointStyle: false,
        tension: 0.1,
      };
    }),
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        align: "center",
        labels: {
          color: theme === "dark" ? "#fff" : "#000",
          font: {
            size: 14,
          },
        },
        position: "top",
      },
      tooltip: theme === "dark" ? tooltip : darkTooltip,
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        display: !isSmallScreen,
        stacked: false,
        grid: {
          color: theme === "dark" ? "#fff" : "#000",
        },
        tick: {
          display: false,
        },
        ticks: {
          callback: dataFormatter,
        },
      },
      x: {
        stacked: false,
        display: !isSmallScreen && xAxis,
        grid: {
          display: false,
        },
      },
    },
  };
  return <Bar ref={ref} data={chartData} options={options} />;
})

export default VisualiseBarChart;
