const statementCategories = [
  {
    name: "Balance Sheet",
  },
  {
    name: "Income Statement",
  },
  {
    name: "Investments",
  },
  {
    name: "Financing",
  },
  {
    name: "Customer’s deposit",
  },
  {
    name: "Debit Security Issued",
  },
  {
    name: "Trade Finance",
  },
  {
    name: "One off Income/Non-recurring Income",
  },
  {
    name: "Segments",
  },
  {
    name: "Capital Adequacy",
  },
  {
    name: "Channels",
  },
  {
    name: "Brokerage",
  },
  {
    name: "Cost/Income %",
  },
  {
    name: "Cost of Risk %",
  },
  {
    name: "Market Share %",
  },
];

const balanceSheetCategories = {
  first: [
    {
      name: "Cash",
    },
    {
      name: "Due from Banks & others",
    },
    {
      name: "Investments(Net)",
    },
    {
      name: "PP & E",
    },
    {
      name: "Invested Properties",
    },
    {
      name: "Other Assets",
    },
    {
      name: "Other Real Estate",
    },
    {
      name: "Derivatives",
    },
    {
      name: "Investments in Accounts",
    },
    {
      name: "Goodwill",
    },
    {
      name: "Total Assets",
    },
  ],
  second: [
    {
      name: "Due to Customers",
    },
    {
      name: "Customer Deposits",
    },
    {
      name: "Debit Securities",
    },
    {
      name: "Derivatives (Net)",
    },
    {
      name: "Other Liabilities",
    },
    {
      name: "Total Liabilities",
    },
  ],
};

const incomeStatementCategories = {
  first: [
    {
      name: "Gross Financing",
    },
    {
      name: "CoF (+ive Value)",
    },
    {
      name: "NYI",
    },
  ],
  second: [
    {
      name: "Fees (Net)",
    },
    {
      name: "FX (Net)",
    },
    {
      name: "Income (loss) from",
    },
    {
      name: "Trading Income",
    },
    {
      name: "Dividends Income",
    },
    {
      name: "Grains on Non-Trading",
    },
    {
      name: "Other Income(Expenses)",
    },
    {
      name: "Total Operating Equity",
    },
  ],
  third: [
    {
      name: "Salaries & Employes",
    },
    {
      name: "Depreciation Amount",
    },
    {
      name: "Other General",
    },
    {
      name: "Impairments-Finanaces",
    },
    {
      name: "Impairments-Investments",
    },
    {
      name: "Total Operating Expenses",
    },
  ],
};

export { statementCategories, balanceSheetCategories, incomeStatementCategories }
