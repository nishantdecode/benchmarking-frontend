import React, { forwardRef } from "react";
import { useTheme } from "next-themes";

import { darkenColor } from "@/util/rgbUtils";
import useMediaQuery from "@/app/hooks/useMediaQuery";

import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  LineController,
  BarController,
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

const VisualiseLineBarChart = forwardRef(function VisualiseBarChart(
  { data1, data2, banks, xAxis, dataFormatter },
  ref
) {
  const { theme } = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 500px)");
  ChartJS.defaults.color = theme === "dark" ? "#fff" : "#000";
  ChartJS.defaults.borderColor = "rgba(0,0,0,0)";
  ChartJS.defaults.backgroundColor = "rgba(75,192,192,1)";
  const fields = Object.keys(data1[0]);
  const index = fields[0];
  const categories = fields.slice(1, fields.length);
  const chartData = {
    labels: data1.map((data) => data[index]),
    datasets: categories
      .map((category, ind) => {
        const lineObject = {
          type: "line",
          label: category + " COI%",
          data: data1.map((dataObj) => dataObj[category]),
          backgroundColor: banks.find((item)=> item.name.toString() === category).color,
          borderColor: banks.find((item)=> item.name.toString() === category).color,
          color: banks.find((item)=> item.name.toString() === category).color,
          pointStyle: false,
          tension: 0.1,
        };

        const barObject = [
          {
            type: "bar",
            label: category + " Operating Income",
            data: data2.map((dataObj) => dataObj[category]),
            backgroundColor: banks.find((item)=> item.name.toString() === category).color,
            borderColor: banks.find((item)=> item.name.toString() === category).color,
            color: banks.find((item)=> item.name.toString() === category).color,
            pointStyle: false,
            tension: 0.1,
          },
        ];
        return [lineObject].concat(barObject);
      })
      .flat(),
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
  return <Chart type="bar" ref={ref} data={chartData} options={options} />;
});

export default VisualiseLineBarChart;
