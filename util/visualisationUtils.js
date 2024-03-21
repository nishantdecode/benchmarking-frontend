import {
  analysisCategories,
  bankMultipleData,
  bankBarMultipleData,
  tableColData,
} from "@/app/data/dashboardData";
import { banks } from "@/app/data/data";

export const visualisationUtils = (category, dummyData) => {
  let displayedCategory = null;
  let data = null;
  if (!dummyData) {
    displayedCategory = analysisCategories.find(
      (categoryObj) => categoryObj.category === category
    );

    data =
      displayedCategory.visualise === "line"
        ? bankMultipleData
        : displayedCategory.visualise === "bar"
        ? bankBarMultipleData
        : tableColData;
  } else {
    data = dummyData
  }

  const names = Object.keys(data[0])
    .map((key) => key.replace(/ Income$/, ""))
    .filter((key) => key !== "year");
  const bankColors = names.map((name) => {
    const bankInfo = banks.find((bank) => bank.name === name);
    return bankInfo ? bankInfo.color : null;
  });

  const dataFormatterCurrency = (value) => {
    return "$" + value;
  };
  const dataFormatterPercentage = (value) => {
    return value + "%";
  };

  return {
    displayedCategory,
    data,
    bankColors,
    dataFormatterCurrency,
    dataFormatterPercentage,
  };
};
