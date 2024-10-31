import { TbCurrencyRiyal } from "react-icons/tb";

export const visualisationLabelUtils = (banks, data) => {
  const names = Object.keys(data[0]).filter((key) => key !== "label");
  console.log({data,e:"I AM CURRENCY"})
  const bankColorsLabel = names.map((name) => {
    const bankInfo = banks.find((bank) => bank.name === name);
    return bankInfo ? bankInfo.color : null;
  });

  const dataFormatterCurrency = (value) => {
    let isMillion = false;
    if(value.toString().length <= 4){
      isMillion = true
    }
    console.log({isMillion,value})
    // return (isMillion ? "":"﷼ "  + value + isMillion ? value +"M" :"");
    return + isMillion ? `${value} M` : `${parseFloat(value)/1000000} M`
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
