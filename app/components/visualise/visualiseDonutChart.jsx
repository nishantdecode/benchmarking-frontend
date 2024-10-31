import React, { forwardRef } from "react";
import { useTheme } from "next-themes";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

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

const VisualiseDonutChart = forwardRef(function VisualiseDonutChart({ marketData }, ref) {
  const { theme } = useTheme();
  ChartJS.defaults.color = theme === "dark" ? "#fff" : "#000";
  ChartJS.defaults.borderColor = "rgba(0,0,0,0)";
  ChartJS.defaults.backgroundColor = "rgba(75,192,192,1)";
  const chartData = {
    labels: marketData.map((data) => data.name),
    datasets: [
      {
        label: " Market share %",
        data: marketData.map((data) => data.value),
        backgroundColor: marketData.map((data) => data.color),
        borderColor: marketData.map((data) => data.color),
        color: marketData.map((data) => data.color),
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: theme === "dark" ? tooltip : darkTooltip,
    },
  };
  return <Doughnut ref={ref} data={chartData} options={options} />;
});

export default VisualiseDonutChart;
