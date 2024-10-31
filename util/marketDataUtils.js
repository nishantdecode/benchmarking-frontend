const generateMarketData = (banks, marketShareByCategory, checkedBanks) => {
  const marketData = [];

  checkedBanks.forEach((bankName) => {
    const bankData = banks.find((bank) => bank.name === bankName);
    const marketShareData = marketShareByCategory.find(
      (data) => data.name === bankName
    );

    if (bankData && marketShareData) {
      marketData.push({
        name: bankName,
        value: marketShareData.value,
        color: bankData.color,
      });
    }
  });

  const totalCheckedBanksValue = marketData.reduce(
    (sum, bank) => sum + bank.value,
    0
  );

  const totalMarketValue = marketShareByCategory.reduce(
    (sum, data) => sum + data.value,
    0
  );
  const othersValue = totalMarketValue - totalCheckedBanksValue;

  marketData.push({
    name: "Others",
    value: othersValue,
    color: "#555677",
  });

  return marketData;
};

export default generateMarketData;
