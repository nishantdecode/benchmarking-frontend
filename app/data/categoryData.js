const executiveSummaryCategories = [
  {
    name: "Gross yield",
    value: "grossYield",
  },
  {
    name: "CoF",
    value: "coF",
  },
  {
    name: "Net Yield Income",
    value: "nyi",
  },
  {
    name: "Fees",
    value: "fees",
  },
  {
    name: "FX",
    value: "fx",
  },
  {
    name: "Other Income",
    value: "otherIncome",
  },
  {
    name: "Operating Income",
    value: "operatingIncome",
  },
  {
    name: "Operating Expenses",
    value: "operatingExpenses",
  },
  {
    name: "Income before Provisions Zakat and Taxes",
    value: "income_before_provision_zakat_and_taxes",
  },
  {
    name: "Provision Expenses",
    value: "provisionExpenses",
  },
  {
    name: "Net Income before Zakat and Taxes",
    value: "income_before_zakat_and_taxes",
  },
  {
    name: "Zakat and Taxes-Net Provision",
    value: "zakat_and_taxes",
  },
  {
    name: "Net Income (Equity Holders)",
    value: "netIncome",
  },
  {
    name: "Core Earnings",
    value: "coreEarnings",
  },
  {
    name: "Total Loans",
    value: "totalLoans",
  },
  {
    name: "Retail Loans",
    value: "retailLoans",
  },
  {
    name: "Corporate & Other Loans",
    value: "corporateLoans",
  },
  {
    name: "Consumer Loans",
    value: "consumerLoans",
  },
  {
    name: "Credit Cards (Gross & Performing)",
    value: "creditCards",
  },
];

const marketShareCategories = [
  {
    name: "Total Loans(Net)",
    value: "totalLoansNet",
  },
  {
    name: "Retail Loans (Gross)",
    value: "retailLoansGross",
  },
  {
    name: "Corporate & Other Loans (Gross)",
    value: "corporate_and_other_loans_gross",
  },
  {
    name: "Investments (Net)",
    value: "investments_net",
  },
  {
    name: "Assets",
    value: "assets",
  },
  {
    name: "Total Deposits",
    value: "totalDeposits",
  },
  {
    name: "Demand Deposits/Current Accounts",
    value: "demandDeposits",
  },
  {
    name: "Time & Saving Deposits",
    value: "time_and_saving_deposits",
  },
  {
    name: "LCs",
    value: "lcs",
  },
  {
    name: "LGs",
    value: "lgs",
  },
  {
    name: "Total Trade Finance",
    value: "totalTradeFinance",
  },
  {
    name: "Gross Yield",
    value: "grossYield",
  },
  {
    name: "CoF",
    value: "coF",
  },
  {
    name: "NYI",
    value: "nyi",
  },
  {
    name: "Fees",
    value: "fees",
  },
  {
    name: "FX",
    value: "fx",
  },
  {
    name: "Other Income",
    value: "otherIncome",
  },
  {
    name: "Salaries & Employees-related Expenses",
    value: "salaries_and_employeesrelatedExpenses",
  },
  {
    name: "Depreciation & Amortisation",
    value: "depreciation_and_amortisation",
  },
  {
    name: "Other General & Admin Expenses",
    value: "other_general_and_admin_expenses",
  },
  {
    name: "Operating Exp",
    value: "operating_exp",
  },
  {
    name: "Operating Income",
    value: "operating_income",
  },
  {
    name: "Total Provisions",
    value: "total_provisions",
  },
  {
    name: "Net Income before Provisions",
    value: "net_income_before_provisions",
  },
  {
    name: "Income before Zakat & Taxes",
    value: "income_before_zakat_and_taxes",
  },
  {
    name: "Net Income",
    value: "net_income",
  },
  {
    name: "Brokerage Firms (Value Traded)",
    value: "brokerage_firms_value_traded",
  },
  {
    name: "Branches",
    value: "branches",
  },
  {
    name: "ATMs",
    value: "atms",
  },
  {
    name: "POS Terminals",
    value: "pos_terminals",
  },
  {
    name: "Remittance Centers",
    value: "remittance_centers",
  },
];

const keyRatioCategories = [
  {
    name: "Cost/Income %",
    value: "income",
  },
  {
    name: "Cost/Income% (Adjusted)",
    value: "incomeAdjusted",
  },
  {
    name: "ROA %",
    value: "roa",
  },
  {
    name: "ROE %",
    value: "roe",
  },
  {
    name: "NIM %",
    value: "nim",
  },
  {
    name: "CoF % (all deposits)",
    value: "cofDeposits",
  },
  {
    name: "Profit Margin % (of Revenues)",
    value: "profitMarginRevenues",
  },
  {
    name: "Costs % (of Revenues)",
    value: "costsRevenues",
  },
  {
    name: "Provisions % (of Revenues)",
    value: "provisionsRevenues",
  },
  {
    name: "Total Expenses% (of Revenues)",
    value: "totalExpensesRevenues",
  },
  {
    name: "Cost of Risk %",
    value: "cor",
  },
  {
    name: "NPL Coverage %",
    value: "nplCoverage",
  },
  {
    name: "NPL/Gross Loans %",
    value: "npl",
  },
  {
    name: "Allowance/Gross Loans %",
    value: "allowance",
  },
  {
    name: "L/D % (SAMA)",
    value: "lSama",
  },
  {
    name: "Current Accounts/Total Deposits %",
    value: "currentAccounts",
  },
  {
    name: "Non-Commission Bearing Deposits%",
    value: "nonCommissionBearingDeposits",
  },
  {
    name: "Time & Savings %",
    value: "time_and_savings",
  },
  {
    name: "NYI % (of Revenues)",
    value: "nyiRevenues",
  },
  {
    name: "Fees % (of Revenues)",
    value: "fees_of_revenues",
  },
  {
    name: "FX % (of Revenues)",
    value: "fxRevenues",
  },
  {
    name: "Other Income % (of Revenues)",
    value: "otherIncomeRevenues",
  },
  {
    name: "Staff Expenses % (of Total Expenses)",
    value: "staffExpenses_of_TotalExpenses",
  },
  {
    name: "Non-Staff Expenses %",
    value: "nonStaffExpenses",
  },
  {
    name: "Provisions % (of Total Expenses)",
    value: "provisions_of_totalExpenses",
  },
  {
    name: "Retail - NPL Coverage %",
    value: "retailNplCoverage",
  },
  {
    name: "Coroprate & Others - NPL Coverage %",
    value: "coroprate_and_others_nplCoverage",
  },
  {
    name: "Retail - NPL/Gross Loans %",
    value: "retailNpl",
  },
  {
    name: "Coroprate - NPL/Gross Loans %",
    value: "coroprateNpl",
  },
  {
    name: "Non - Yield Income / Operating Income %",
    value: "nyiIncome_operatingIncome",
  },
  {
    name: "Non - Yield Income / Operating Expenses %",
    value: "nyiIncome_operatingExpenses",
  },
  {
    name: "Non - Yield Income / Total Assets",
    value: "nyiIncome_totalAssets",
  },
  {
    name: "Operating Expenses/Total Assets %",
    value: "operatingExpenses_totalAssets",
  },
];

const itemAnalysisCategories = {
  balanceSheet: [
    {
      name: "Demand Deposits",
      value: "demandDeposits",
    },
    {
      name: "T&S Deposits",
      value: "t_and_s_deposits",
    },
    {
      name: "Total Deposits",
      value: "total_deposits",
    },
    {
      name: "Investments",
      value: "investments",
    },
    {
      name: "Assets",
      value: "assets",
    },
    {
      name: "LC",
      value: "lc",
    },
    {
      name: "LG",
      value: "lg",
    },
    {
      name: "Trade Finance",
      value: "trade_finance",
    },
    {
      name: "Retail: Performing Loans",
      value: "retail_performing_loans",
    },
    {
      name: "Corporate & Others: Performing Loans",
      value: "corporate_and_others_performing_loans",
    },
    {
      name: "Total Loans (net)",
      value: "total_loans_net",
    },
  ],
  msBalanceSheet: [
    {
      name: "MS-Demand Deposits",
      value: "demandDeposits",
    },
    {
      name: "MS-T&S Deposits",
      value: "t_and_s_deposits",
    },
    {
      name: "MS-Total Deposits",
      value: "total_deposits",
    },
    {
      name: "MS-Investments",
      value: "investments",
    },
    {
      name: "MS-Assets",
      value: "assets",
    },
    {
      name: "MS-LC",
      value: "lc",
    },
    {
      name: "MS-LG",
      value: "lg",
    },
    {
      name: "MS-Trade Finance",
      value: "trade_finance",
    },
    {
      name: "MS-Retail: Performing Loans",
      value: "retail_performing_loans",
    },
    {
      name: "MS-Corporate & Others: Performing Loans",
      value: "corporate_and_others_performing_loans",
    },
    {
      name: "MS-Total Loans (net)",
      value: "total_loans_net",
    },
  ],
  incomeStatement: [
    {
      name: "Gross Yield",
      value: "grossYield",
    },
    {
      name: "CoF",
      value: "coF",
    },
    {
      name: "Net Yield Income",
      value: "nyi",
    },
    {
      name: "Fees",
      value: "fees",
    },
    {
      name: "FX",
      value: "fx",
    },
    {
      name: "Other Income",
      value: "otherIncome",
    },
    {
      name: "Operating Income",
      value: "operatingIncome",
    },
    {
      name: "Salaries & Employees-related Expenses",
      value: "salaries_and_employees_related_expenses",
    },
    {
      name: "Depreciation & Amortization Expenses",
      value: "depreciation_and_amortization_expenses",
    },
    {
      name: "Other General & Admin. Expenses",
      value: "other_general_and_admin_expenses",
    },
    {
      name: "Operating Expenses",
      value: "operatingExpenses",
    },
    {
      name: "Provisions (loans + investments)",
      value: "provisions_loans_and_investments",
    },
    {
      name: "Income Before Provisions",
      value: "income_before_provisions",
    },
    {
      name: "Income before Zakat & Tax",
      value: "income_before_zakat_and_tax",
    },
    {
      name: "Net Income",
      value: "netIncome",
    },
  ],
  msIncomeStatement: [
    {
      name: "MS-Gross Yield",
      value: "grossYield",
    },
    {
      name: "MS-CoF",
      value: "coF",
    },
    {
      name: "MS-Net Yield Income",
      value: "nyi",
    },
    {
      name: "MS-Fees",
      value: "fees",
    },
    {
      name: "MS-FX",
      value: "fx",
    },
    {
      name: "MS-Other Income",
      value: "otherIncome",
    },
    {
      name: "MS-Operating Income",
      value: "operatingIncome",
    },
    {
      name: "MS-Salaries & Employees-related Expenses",
      value: "salaries_and_employees_related_expenses",
    },
    {
      name: "MS-Depreciation & Amortization Expenses",
      value: "depreciation_and_amortization_expenses",
    },
    {
      name: "MS-Other General & Admin. Expenses",
      value: "other_general_and_admin_expenses",
    },
    {
      name: "MS-Operating Expenses",
      value: "operatingExpenses",
    },
    {
      name: "MS-Provisions (loans + investments)",
      value: "provisions_loans_and_investments",
    },
    {
      name: "MS-Income Before Provisions",
      value: "income_before_provisions",
    },
    {
      name: "MS-Income before Zakat & Tax",
      value: "income_before_zakat_and_tax",
    },
    {
      name: "MS-Net Income",
      value: "netIncome",
    },
  ],
};

const commonSizeCategories = {
  assets: [
    {
      name: "Cash",
      value: "cash",
    },
    {
      name: "Due from Banks & FIs",
      value: "due_from_banks_and_fis",
    },
    {
      name: "Investments (net)",
      value: "investments_net",
    },
    {
      name: "Financing (net)",
      value: "financing_net",
    },
    {
      name: "PP & E",
      value: "pp_and_e",
    },
    {
      name: "Invested properties (net)",
      value: "invested_properties_net",
    },
    {
      name: "Other Assets",
      value: "other_assets",
    },
    {
      name: "Other Real Estate",
      value: "other_real_estate",
    },
    {
      name: "Derivatives",
      value: "derivatives",
    },
    {
      name: "Investments in Associates",
      value: "investments_in_association",
    },
    {
      name: "Goodwill",
      value: "goodwill",
    },
    {
      name: "Total Assets",
      value: "totalAssets",
    },
  ],
  liabilities: [
    {
      name: "Due to Banks & other FIs",
      value: "due_to_banks_and_other_fis",
    },
    {
      name: "Customers' Deposits",
      value: "customers_deposits",
    },
    {
      name: "Debit Securities issued/Borrowings",
      value: "borrowings",
    },
    {
      name: "Derivatives (net)",
      value: "derivatives_net",
    },
    {
      name: "Other Liabilities",
      value: "other_liabilities",
    },
    {
      name: "Total Liabilities",
      value: "total_liabilities",
    },
  ],
  shareholders_equity: [
    {
      name: "Share Capital",
      value: "share_capital",
    },
    {
      name: "Statutory Reserve",
      value: "statutory_reserve",
    },
    {
      name: "Other Reserve",
      value: "other_reserve",
    },
    {
      name: "Retained Earnings",
      value: "retained_earnings",
    },
    {
      name: "Proposed Dividends",
      value: "proposed_dividends",
    },
    {
      name: "Treasury Shares",
      value: "treasury_shares",
    },
    {
      name: "Employees' Related",
      value: "employees_related",
    },
    {
      name: "Foreign Currency Translation Reserve",
      value: "foreign_currency_translation_reserve",
    },
    {
      name: "Total Shareholders Equity",
      value: "total_shareholders_equity",
    },
  ],
  operating_income: [
    {
      name: "Gross Financing & Investment Income",
      value: "gross_financing_and_investment_income",
    },
    {
      name: "CoF (Positive Value)",
      value: "coF_positive_value",
    },
    {
      name: "Net Yield Income (NYI)",
      value: "nyi",
    },
    {
      name: "Fees (net)",
      value: "fees_net",
    },
    {
      name: "FX (net)",
      value: "fx_net",
    },
    {
      name: "Income (loss) from FVIS Investments (net)",
      value: "income_loss_from_fvis_investments_net",
    },
    {
      name: "Trading Income (net)",
      value: "trading_income_net",
    },
    {
      name: "Dividends Income",
      value: "dividend_income",
    },
    {
      name: "Gains on non-trading Financial institutions (net)",
      value: "gains_on_non_trading_financial_institutions_net",
    },
    {
      name: "Other Income (Expenses) (net)",
      value: "other_income_expenses_net",
    },
    {
      name: "Total Operating Income",
      value: "total_operating_income",
    },
  ],
  operating_expenses: [
    {
      name: "Salaries & Employees-related Expenses",
      value: "salaries_and_employees_related_expenses",
    },
    {
      name: "Depreciation & Amortisation",
      value: "depreciation_and_amortisation",
    },
    {
      name: "Other General & Admin Expenses",
      value: "other_general_and_admin_expenses",
    },
    {
      name: "Impairments - Financing (net)",
      value: "impairments_financing_net",
    },
    {
      name: "Impairments - Invetments (net)",
      value: "impairments_investments_net",
    },
    {
      name: "Total Operating Expenses",
      value: "total_operating_expenses",
    },
    {
      name: "Operating Income",
      value: "operating_income",
    },
    {
      name: "Zakat",
      value: "zakat",
    },
    {
      name: "Net Income after Zakat",
      value: "net_income_after_zakat",
    },
  ],
};

const trendAnalysisCategories = [
  {
    name: "Income before Provisions",
    value: "income_before_provisions",
  },
  {
    name: "NIM %",
    value: "nim",
  },
  {
    name: "Cost of Risk",
    value: "cor",
  },
  {
    name: "Operating Income/Expense",
    value: "incomeExpense",
  },
  {
    name: "Total Investment",
    value: "investments",
  },
  {
    name: "Cost of Income",
    value: "income",
  },
  {
    name: "Total Deposits",
    value: "totalDeposits",
  },
  {
    name: "Total Gross Loans",
    value: "totalGrossLoans",
  },
];

const trendTableCategories = [
  {
    name: "Deposit",
    value: "demandDeposits",
  },
  {
    name: "Time",
    value: "customerTimeInvestment",
  },
  {
    name: "Savings",
    value: "customerSavings",
  },
  {
    name: "Retail",
    value: "retail",
  },
  {
    name: "Corporate",
    value: "corporate",
  },
  {
    name: "Total",
    value: "total",
  },
];

const individualBankCategories = [
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

const individualBankDataCategories = {
  assets: [
    {
      name: "Cash",
      value: "cash",
    },
    {
      name: "Due from Banks & Fls",
      value: "dueFromBanksAndOtherFinancial",
    },
    {
      name: "Investments (net)",
      value: "investments",
    },
    {
      name: "PP&E",
      value: "property",
    },
    {
      name: "Invested properties (net)",
      value: "investedProperty",
    },
    {
      name: "Other Assets",
      value: "otherAssets",
    },
    {
      name: "Other Real Estate",
      value: "otherRealEstate",
    },
    {
      name: "Derivatives",
      value: "derivatives",
    },
    {
      name: "Goodwill",
      value: "goodWill",
    },
    {
      name: "Investments in Associates",
      value: "investmentInAssociation",
    },
    {
      name: "Total Assets",
      value: "totalAssets",
    },
  ],
  liabilities: [
    {
      name: "Due to Banks & other Fls",
      value: "dueToSaudiMonetaryAutority",
    },
    {
      name: "Customers' Deposits",
      value: "customerDeposit",
    },
    {
      name: "Debet Securities issued/Borrowings",
      value: "debetSecurityIssued",
    },
    {
      name: "Derivatives (net)",
      value: "netDerivatives",
    },
    {
      name: "Other Liabilties",
      value: "otherLiablities",
    },
    {
      name: "Total Liabilities",
      value: "totalLiablities",
    },
  ],
  shareEquityHolder: [
    {
      name: "Share Capital",
      value: "shareCapital",
    },
    {
      name: "Statutory Reserve",
      value: "statutoryReserve",
    },
    {
      name: "Other Reserve",
      value: "totalOtherReserve",
    },
    {
      name: "Retained Earnings",
      value: "retainedEarning",
    },
    {
      name: "Proposed Dividends",
      value: "proposedDividends",
    },
    {
      name: "Treasury Shares",
      value: "treasuryShares",
    },
    {
      name: "Employees' Related",
      value: "employeeRelated",
    },
    {
      name: "Foreign Currency Translation Reserve",
      value: "foreignCurrenyReserve",
    },
    {
      name: "Total Shareholders' Equity",
      value: "totalShareHolderEquity",
    },
  ],
  equity: [
    {
      name: "Tier I Sukuk",
      value: "tier1skuku",
    },
    {
      name: "Equity Holders",
      value: "bankEquityHolder",
    },
    {
      name: "Non-Controlling Interests",
      value: "nonControllingIntersts",
    },
    {
      name: "Total Equity",
      value: "totalEquity",
    },
  ],
  liabilityAndEquity: [
    {
      name: "Total Liabilities & Equity",
      value: "totalLiabilityAndEquity",
    },
  ],
  nyi: [
    {
      name: "Gross Financing & Investment Income",
      value: "gross",
    },
    {
      name: "CoF (Postive Value)",
      value: "cof",
    },
    {
      name: "NYI",
      value: "nyi",
    },
  ],
  totalOperatingEquity: [
    {
      name: "Fees (net)",
      value: "fees",
    },
    {
      name: "FX (net)",
      value: "fx",
    },
    {
      name: "Income (loss) from FVIS Invesements (net)",
      value: "fvisInvestments",
    },
    {
      name: "Trading Income (net)",
      value: "tradingIncome",
    },
    {
      name: "Dividends Income",
      value: "dividentIncome",
    },
    {
      name: "Gains on non-trading Financial insts. (net)",
      value: "nonTradingIncome",
    },
    {
      name: "Other Income (Expenses) (net)",
      value: "otherIncome",
    },
    {
      name: "",
      value: "totalOperatingEquity",
    },
  ],
  totalOperatingExpenses: [
    {
      name: "Salaries & Employees-related Expenses",
      value: "salaries",
    },
    {
      name: "Depreciation & Amortisation",
      value: "depreciationExpenses",
    },
    {
      name: "Amortisation of other intangible assets",
      value: "otherGeneralExpenses",
    },
    {
      name: "Impairments - Financing (net)",
      value: "financialImpairment",
    },
    {
      name: "Impairments - Investments (net)",
      value: "investmentImpairment",
    },
    {
      name: "Total Operating Income",
      value: "totalOperatingExpenses",
    },
  ],
  netIncomeBeforeZakat: [
    {
      name: "Other Income (expenses) (net) Non-Operational",
      value: "otherIncome",
    },
    {
      name: "Total Net Income before Zakat",
      value: "netIncomeBeforeZakat",
    },
  ],
  netIncomeAfterZakat: [
    {
      name: "Zakat",
      value: "zakat",
    },
    {
      name: "Total Net Income after Zakat",
      value: "netIncomeAfterZakat",
    },
  ],
  equityHolder: [
    {
      name: "Equity Holders of the bank",
      value: "equityHoldersOfTheBank",
    },
  ],
  totalNetIncome: [
    {
      name: "Non-Controlling Interests",
      value: "nonControllingInterest",
    },
    {
      name: "Total Net Income",
      value: "totalNetIncome",
    },
  ],
  overall: [
    {
      name: "Income before Proviosns, Zakat, & Taxes",
      value: "income_before_provsions_zakat_taxes",
    },
    {
      name: "Costs (for C/1% & Costs)",
      value: "cost",
    },
    {
      name: "Income (for C/1% & Revenues)",
      value: "income",
    },
    {
      name: "Total Provisions",
      value: "totalProvisions",
    },
    {
      name: "FX & Others Income",
      value: "fxAndOtherIncome",
    },
    {
      name: "Other Income (besides Fees & FX)",
      value: "otherIncome",
    },
    {
      name: "Non-YI",
      value: "nyi",
    },
    {
      name: "Staff Expenses",
      value: "staffExpenses",
    },
    {
      name: "Non-Staff Expensses",
      value: "nonStaffExpenses",
    },
  ],
  portfolio: [
    {
      name: "Total Investments",
      value: "totalInvestments",
    },
    {
      name: "Investments in associates & JVS - Total",
      value: "investmentInAssociation",
    },
    {
      name: "Portfolio (net)",
      value: "Portfolio",
    },
  ],
  retail: [
    {
      name: "Retail - Performing Loans",
      value: "performingLoans",
    },
    {
      name: "Retail - NPLs",
      value: "npl",
    },
    {
      name: "Retail - Gross",
      value: "gross",
    },
    {
      name: "Allowance for Retail",
      value: "allowance",
    },
    {
      name: "Retail - Net Loans",
      value: "netLoan",
    },
  ],
  corporate: [
    {
      name: "Corporate & Others - Performing Loans",
      value: "performingLoans",
    },
    {
      name: "Corporate & Others - NPLs",
      value: "npl",
    },
    {
      name: "Corporate & Others - Gross",
      value: "gross",
    },
    {
      name: "Allowance for Corporate & Others",
      value: "allowance",
    },
    {
      name: "Corporate & Others - Net Loans",
      value: "netLoan",
    },
  ],
  consumer: [
    {
      name: "Consumer Loans - Performing Loans",
      value: "performingLoans",
    },
    {
      name: "Consumer Loans - NPLS",
      value: "npl",
    },
    {
      name: "Consumer Loans - Gross",
      value: "gross",
    },
    {
      name: "Allowance for Consumer Loans",
      value: "allowance",
    },
    {
      name: "Consumer Loans - Net Loans",
      value: "netLoan",
    },
  ],
  creditCard: [
    {
      name: "CC-Performing Loans",
      value: "performingLoans",
    },
    {
      name: "CC-NPLS",
      value: "npl",
    },
    {
      name: "CC - Gross",
      value: "gross",
    },
    {
      name: "Allowance for CC",
      value: "allowance",
    },
    {
      name: "CC - Net Loans",
      value: "netLoan",
    },
  ],
  customerDeposit: [
    {
      name: "Demand Deposits/Current Accounts",
      value: "demandDeposits",
    },
    {
      name: "Customers' Time Investments",
      value: "customerTimeInvestment",
    },
    {
      name: "Customers' Savings",
      value: "customerSavings",
    },
    {
      name: "Other Deposits",
      value: "otherDeposits",
    },
    {
      name: "Total Deposits",
      value: "totalDeposits",
    },
    {
      name: "Total Non-Commission Deposits",
      value: "totalNonCommissionDeposits",
    },
    {
      name: "Time & Savings Deposits",
      value: "timeSavingsDeposits",
    },
  ],
  debitSecurity: [
    {
      name: "The Short-Term Portion",
      value: "shortTermPortion",
    },
    {
      name: "The Long-Term Portion",
      value: "longTermPortion",
    },
  ],
  tradeFinance: [
    {
      name: "LCs",
      value: "LCs",
    },
    {
      name: "LGS",
      value: "LGs",
    },
    {
      name: "Total Trade Finance",
      value: "totalTradeFinance",
    },
  ],
  oneOffIncome: [
    {
      name: "Gains on non-trading Financial insts. (net)",
      value: "nonTradingGains",
    },
    {
      name: "Other One-Offs Income/Gains (Loss)",
      value: "otherGains",
    },
    {
      name: "Income (Adjusted) (for C/1%)",
      value: "adjustedIncome",
    },
  ],
  retailSegment: [
    {
      name: "Assets",
      value: "assets",
    },
    {
      name: "Liabilities",
      value: "liabilities",
    },
    {
      name: "Net Revenues",
      value: "revenues",
    },
    {
      name: "Costs",
      value: "costs",
    },
    {
      name: "Impairments - Financing (net)",
      value: "financialImpairments",
    },
    {
      name: "Impairments - Investments/Others (net)",
      value: "investmentImpairments",
    },
    {
      name: "Total Provisions",
      value: "totalProvisions",
    },
    {
      name: "Total Expenses",
      value: "totalExpenses",
    },
    {
      name: "PPI",
      value: "ppi",
    },
    {
      name: "Net Income pre-zakat",
      value: "preZakat",
    },
  ],
  corporateSegment: [
    {
      name: "Assets",
      value: "assets",
    },
    {
      name: "Liabilities",
      value: "liabilities",
    },
    {
      name: "Net Revenues",
      value: "revenues",
    },
    {
      name: "Costs",
      value: "costs",
    },
    {
      name: "Impairments - Financing (net)",
      value: "financialImpairments",
    },
    {
      name: "Impairments - Investments/Others (net)",
      value: "investmentImpairments",
    },
    {
      name: "Total Provisions",
      value: "totalProvisions",
    },
    {
      name: "Total Expenses",
      value: "totalExpenses",
    },
    {
      name: "PPI",
      value: "ppi",
    },
    {
      name: "Net Income pre-zakat",
      value: "preZakat",
    },
  ],
  treasury: [
    {
      name: "Assets",
      value: "assets",
    },
    {
      name: "Liabilities",
      value: "liabilities",
    },
    {
      name: "Net Revenues",
      value: "revenues",
    },
    {
      name: "Costs",
      value: "costs",
    },
    {
      name: "Impairments - Financing (net)",
      value: "financialImpairments",
    },
    {
      name: "Impairments - Investments/Others (net)",
      value: "investmentImpairments",
    },
    {
      name: "Total Provisions",
      value: "totalProvisions",
    },
    {
      name: "Total Expenses",
      value: "totalExpenses",
    },
    {
      name: "PPI",
      value: "ppi",
    },
    {
      name: "Net Income pre-zakat",
      value: "preZakat",
    },
  ],
  capitalAdequacy: [
    {
      name: "Total Pillar I - RWA",
      value: "rwa",
    },
    {
      name: "Tier I",
      value: "tier1",
    },
    {
      name: "Tier II",
      value: "tier2",
    },
    {
      name: "Tier I+II",
      value: "sumOfTier",
    },
    {
      name: "CAR (Tier 1)%",
      value: "tier1CAR",
    },
    {
      name: "CAR (Tier 1+11)%",
      value: "sumOfTierCAR",
    },
  ],
  channel: [
    {
      name: "Branches",
      value: "branches",
    },
    {
      name: "ATMs",
      value: "atms",
    },
    {
      name: "POS Terminals",
      value: "pos",
    },
    {
      name: "Remittance Centers",
      value: "remittance",
    },
  ],
  brokerage: [
    {
      name: "Brokerage Firms (Value Traded) YTD",
      value: "brokerageFirms",
    },
  ],
  costIncome: [
    {
      name: "Cost/Income%",
      value: "income",
    },
    {
      name: "Cost/Income% (Adjusted)",
      value: "incomeAdjusted",
    },
    {
      name: "ROA%",
      value: "roa",
    },
    {
      name: "ROE%",
      value: "roe",
    },
    {
      name: "RORWA%",
      value: "roRwa",
    },
    {
      name: "NIM% (Gross Loans & Total DF Banks)",
      value: "nim",
    },
    {
      name: "CoF% (all Deposits)",
      value: "cofDeposits",
    },
    {
      name: "Profit Margin % (of Revenues)",
      value: "profitMarginRevenues",
    },
    {
      name: "Costs% (of Revenues)",
      value: "costsRevenues",
    },
    {
      name: "Provisions% (of Revenues)",
      value: "provisionsRevenues",
    },
    {
      name: "Total Expenses% (of Revenues)",
      value: "totalExpensesRevenues",
    },
  ],
  timeSaving: [
    {
      name: "NPL Coverage%",
      value: "nplCoverage",
    },
    {
      name: "NPL/Gross Loans%",
      value: "npl",
    },
    {
      name: "Allowance/Gross Loans%",
      value: "allowance",
    },
    {
      name: "L/D%",
      value: "ld",
    },
    {
      name: "L/D% (SAMA)",
      value: "lSama",
    },
    {
      name: "Current Accounts/Total Deposits%",
      value: "currentAccounts",
    },
    {
      name: "Non-Commission Bearing Deposits%",
      value: "nonCommissionBearingDeposits",
    },
    {
      name: "Time & Savings%",
      value: "time_and_savings",
    },
  ],
  otherIncomeRevenues: [
    {
      name: "NYI% (of Revenues)",
      value: "nyiRevenues",
    },
    {
      name: "Fees% (of Revenues)",
      value: "fees_of_revenues",
    },
    {
      name: "FX% (of Revenues)",
      value: "fxRevenues",
    },
    {
      name: "Other Income% (of Revenues)",
      value: "otherIncomeRevenues",
    },
  ],
  provisions: [
    {
      name: "Staff Expenses% (of Total Expenses)",
      value: "staffExpenses_of_TotalExpenses",
    },
    {
      name: "Non-Staff Expenses % (of Total Expenses)",
      value: "nonStaffExpenses",
    },
    {
      name: "Provisions% (of Total Expenses)",
      value: "provisions_of_totalExpenses",
    },
  ],
  loan: [
    {
      name: "Retail - NPL Coverage%",
      value: "retailNplCoverage",
    },
    {
      name: "Coroprate & Others - NPL Coverage%",
      value: "coroprate_and_others_nplCoverage",
    },
    {
      name: "Retail - NPL/Gross Loans%",
      value: "retailNpl",
    },
    {
      name: "Coroprate & Others - NPL/Gross Loans%",
      value: "coroprateNpl",
    },
  ],
  marketShare: [
    {
      name: "Total Loans (net)",
      value: "totalLoansNet",
    },
    {
      name: "Retail Loans (Gross)",
      value: "retailLoansGross",
    },
    {
      name: "Corporate & Other Loans (Gross)",
      value: "corporate_and_other_loans_gross",
    },
    {
      name: "Investments (net)",
      value: "investments_net",
    },
    {
      name: "Assets",
      value: "assets",
    },
    {
      name: "Total Deposits",
      value: "totalDeposits",
    },
    {
      name: "Demand Deposits/Current Accounts",
      value: "demandDeposits",
    },
    {
      name: "Time & Saving Deposits",
      value: "time_and_saving_deposits",
    },
    {
      name: "LCs",
      value: "lcs",
    },
    {
      name: "LGs",
      value: "lgs",
    },
    {
      name: "Total Trade Finance",
      value: "totalTradeFinance",
    },
    {
      name: "NYI",
      value: "nyi",
    },
    {
      name: "Fees",
      value: "fees",
    },
    {
      name: "FX",
      value: "fx",
    },
    {
      name: "Brokerage Firms (Value Traded) YTD",
      value: "brokerageFirms",
    },
    {
      name: "Branches",
      value: "branches",
    },
    {
      name: "ATMs",
      value: "atms",
    },
    {
      name: "POS Terminals",
      value: "pos",
    },
    {
      name: "Remittance Centers",
      value: "remittance",
    },
    {
      name: "Residential Mortgages (Basel) - Retail",
      value: "residentialMortgages",
    },
    {
      name: "AUM",
      value: "aum",
    },
    {
      name: "Gross Yield",
      value: "grossYield",
    },
    {
      name: "CoF",
      value: "coF",
    },
    {
      name: "Other Income",
      value: "otherIncome",
    },
    {
      name: "Operating Income",
      value: "operatingIncome",
    },
    {
      name: "Operating Income (Adjusted)",
      value: "operatingIncomeAdjusted",
    },
    {
      name: "Costs",
      value: "costs",
    },
    {
      name: "Total Provisions",
      value: "provision",
    },
    {
      name: "PPI - Market Share",
      value: "ppi",
    },
    {
      name: "Income before Zakat & Taxes - M.Shares",
      value: "incomeBeforeZakat",
    },
    {
      name: "Zakat & Taxes Provisions - M.Shares",
      value: "zakat",
    },
    {
      name: "This Period Days",
      value: "periodDays",
    },
    {
      name: "This Period Year-Days",
      value: "periodYearDays",
    },
    {
      name: "Salaries & Employees-related Expenses",
      value: "salaries_and_employeesrelatedExpenses",
    },
    {
      name: "Depreciation & Amortisation",
      value: "depreciation_and_amortisation",
    },
    {
      name: "Other General & Admin. Expenses",
      value: "other_general_and_admin_expenses",
    },
    {
      name: "Total Operating Expenses",
      value: "operating_exp",
    },
    {
      name: "Irrevocable commitments to extend credit",
      value: "irrevocableCommitments",
    },
    {
      name: "Non-Yield Annulazied",
      value: "annualNonYield",
    },
    {
      name: "OPEX Annulazied",
      value: "annualOpex",
    },
    {
      name: "Non - Yield Income / Operating Income",
      value: "nonyield_operatingIncome",
    },
    {
      name: "Non - Yield Income / Operating Expenses",
      value: "nonyield_operatingExpenses",
    },
    {
      name: "Non-Yield Income / Total Assets",
      value: "nonyield_totalAssets",
    },
    {
      name: "Operating Expenses/Total",
      value: "operatingExpenses_totalAssets",
    },
  ]
};

export {
  executiveSummaryCategories,
  marketShareCategories,
  keyRatioCategories,
  itemAnalysisCategories,
  commonSizeCategories,
  trendAnalysisCategories,
  trendTableCategories,
  individualBankCategories,
  individualBankDataCategories
};
