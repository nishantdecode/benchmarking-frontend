export const visualisationLabelUtils = (banks, data) => {
  const names = Object.keys(data[0]).filter((key) => key !== "label");
  const bankColorsLabel = names.map((name) => {
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
    bankColorsLabel,
    dataFormatterCurrency,
    dataFormatterPercentage,
  };
};
