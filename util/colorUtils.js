export function extractColorsFromBanks(balanceSheetData, banks) {
  const colors = [];

  balanceSheetData.forEach((entry) => {
    const bank = banks.find((bank) => bank.name === entry.bank);

    if (bank) {
      colors.push(bank.color);
    }
  });

  return colors;
}
