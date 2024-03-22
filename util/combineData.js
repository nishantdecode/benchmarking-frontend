import { darkenColor } from "./rgbUtils";

export const combineData = (banks, operatingIncome, operatingExpense) => {
  const combined = [];
  let bankColorsLabel = [];
  operatingIncome.forEach((incomeItem) => {
    const label = incomeItem.label;
    const correspondingExpense = operatingExpense.find(
      (expenseItem) => expenseItem.label === label
    );
    if (correspondingExpense) {
      const entry = {
        label: label,
      };
      for (let bank in incomeItem) {
        if (bank !== "label") {
          const color = banks.find(item => item.name === bank).color;
          entry[`${bank} Income`] = incomeItem[bank];
          bankColorsLabel.push(color);
          const correspondingExpenseBank = operatingExpense.find(
            (expenseItem) => expenseItem.label === label
          );
          if (correspondingExpenseBank) {
            entry[`${bank} Expense`] = correspondingExpenseBank[bank];
            bankColorsLabel.push(darkenColor(color, 0.3))
          } else {
            entry[`${bank} Expense`] = null;
            bankColorsLabel.push(darkenColor(color, 0.3))
          }
        }
      }
      combined.push(entry);
    }
  });
  return {
    bankColorsLabel,
    combined
  };
};