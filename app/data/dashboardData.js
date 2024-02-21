import { PiBankBold } from "react-icons/pi";

const competitionData = [
  {
    category: "Income before Provisions",
    highest: {
      name: "SAIB",
      iconUrl: <PiBankBold size={16} />,
      value: "821245860.00",
      valueType: 'currency'
    },
    lowest: {
      name: "Bank Albilad",
      iconUrl: <PiBankBold size={16} />,
      value: "821245860.00",
      valueType: 'currency'
    },
  },
  {
    category: "NIM %",
    highest: {
      name: "SAB",
      iconUrl: <PiBankBold size={16} />,
      value: "8.2 %",
      valueType: 'percentage'
    },
    lowest: {
      name: "Al Rajhi Bank",
      iconUrl: <PiBankBold size={16} />,
      value: "1.2 %",
      valueType: 'percentage'
    },
  },
  {
    category: "Cost of Risk",
    highest: {
      name: "Arab National Bank",
      iconUrl: <PiBankBold size={16} />,
      value: "4.22 %",
      valueType: 'percentage'
    },
    lowest: {
      name: "SAB",
      iconUrl: <PiBankBold size={16} />,
      value: "0.12 %",
      valueType: 'percentage'
    },
  },
  {
    category: "Operating Income/Expense",
    highest: {
      name: "SAIB",
      iconUrl: <PiBankBold size={16} />,
      value: "1625300.54",
      valueType: 'currency'
    },
    lowest: {
      name: "Bank Albilad",
      iconUrl: <PiBankBold size={16} />,
      value: "1625300.54",
      valueType: 'currency'
    },
  },
  {
    category: "Total Investment",
    highest: {
      name: "SAB",
      iconUrl: <PiBankBold size={16} />,
      value: "821245860.00",
      valueType: 'currency'
    },
    lowest: {
      name: "SAIB",
      iconUrl: <PiBankBold size={16} />,
      value: "821245860.00",
      valueType: 'currency'
    },
  },
  {
    category: "Cost of Income",
    highest: {
      name: "SAIB",
      iconUrl: <PiBankBold size={16} />,
      value: "821245860.00",
      valueType: 'currency'
    },
    lowest: {
      name: "Bank Albilad",
      iconUrl: <PiBankBold size={16} />,
      value: "821245860.00",
      valueType: 'currency'
    },
  },
  {
    category: "Total Deposits",
    highest: {
      name: "SAB",
      iconUrl: <PiBankBold size={16} />,
      value: "821245860.00",
      valueType: 'currency'
    },
    lowest: {
      name: "SAIB",
      iconUrl: <PiBankBold size={16} />,
      value: "821245860.00",
      valueType: 'currency'
    },
  },
  {
    category: "Total Gross Loans",
    highest: {
      name: "SAIB",
      iconUrl: <PiBankBold size={16} />,
      value: "821245860.00",
      valueType: 'currency'
    },
    lowest: {
      name: "Bank Albilad",
      iconUrl: <PiBankBold size={16} />,
      value: "821245860.00",
      valueType: 'currency'
    },
  },
];

const banks = [
  {
    name: "SAIB",
    iconUrl: <PiBankBold size={20} />,
  },
  {
    name: "Bank Albilad",
    iconUrl: <PiBankBold size={20} />,
  },
  {
    name: "Saudi Awwal Bank",
    iconUrl: <PiBankBold size={20} />,
  },
  {
    name: "Al-Rajhi Bank",
    iconUrl: <PiBankBold size={20} />,
  },
  {
    name: "Arab National Bank",
    iconUrl: <PiBankBold size={20} />,
  },
  {
    name: "SAB",
    iconUrl: <PiBankBold size={20} />,
  },
  {
    name: "Bank Aljazira",
    iconUrl: <PiBankBold size={20} />,
  },
  {
    name: "Saudi National Bank",
    iconUrl: <PiBankBold size={20} />,
  },
  {
    name: "Riyad bank",
    iconUrl: <PiBankBold size={20} />,
  },
  {
    name: "Bank Saudi Fransi",
    iconUrl: <PiBankBold size={20} />,
  },
];

const analysisCategories = [
  {
    category: "Income before Provisions",
    visualise: "line",
  },
  {
    category: "NIM %",
    visualise: "line",
  },
  {
    category: "Cost of Risk",
    visualise: "line",
  },
  {
    category: "Operating Income/Expense",
    visualise: "bar",
  },
  {
    category: "Total Investment",
    visualise: "line",
  },
  {
    category: "Cost of Income",
    visualise: "line",
  },
  {
    category: "Total Deposits",
    visualise: "table",
  },
  {
    category: "Total Gross Loans",
    visualise: "table",
  },
];

// http://localhost:3000/dashboard/trend?bank=Bank+of+Example&competitors=Competitor+A,Competitor+B,Competitor+C&category=Finance

const bankData = [
  {
    year: "2022",
    "SAIB": 1290,
  },
  {  
    year: "2021",
    "SAIB": 1856,
  },
  {
    year: "2020",
    "SAIB": 3122,
  },
  {
    year: "2019",
    "SAIB": 2970,
  },
  {
    year: "2018",
    "SAIB": 2775,
  },
  {
    year: "2017",
    "SAIB": 3129,
  },
  {
    year: "2016",
    "SAIB": 3490,
  },
  {
    year: "2015",
    "SAIB": 2903,
  },
  {
    year: "2014",
    "SAIB": 2643,
  },
  {
    year: "2013",
    "SAIB": 2837,
  },
  {
    year: "2012",
    "SAIB": 2954,
  },
  {
    year: "2011",
    "SAIB": 3239,
  },
];

const bankMultipleData = [
  {
    year: "2022",
    "SAIB": 1290,
    "Albilad": 1522,
    "Saudi Awwal Bank": 2300,
  },
  {  
    year: "2021",
    "SAIB": 1856,
    "Albilad": 1305,
    "Saudi Awwal Bank": 2600,
  },
  {
    year: "2020",
    "SAIB": 3122,
    "Albilad": 1925,
    "Saudi Awwal Bank": 3520,
  },
  {
    year: "2019",
    "SAIB": 2970,
    "Albilad": 1850,
    "Saudi Awwal Bank": 3340,
  },
  {
    year: "2018",
    "SAIB": 2775,
    "Albilad": 2103,
    "Saudi Awwal Bank": 3730,
  },
  {
    year: "2017",
    "SAIB": 3129,
    "Albilad": 2340,
    "Saudi Awwal Bank": 2570,
  },
  {
    year: "2016",
    "SAIB": 3490,
    "Albilad": 2234,
    "Saudi Awwal Bank": 4190,
  },
  {
    year: "2015",
    "SAIB": 2903,
    "Albilad": 2502,
    "Saudi Awwal Bank": 4290,
  },
  {
    year: "2014",
    "SAIB": 2643,
    "Albilad": 2019,
    "Saudi Awwal Bank": 4260,
  },
  {
    year: "2013",
    "SAIB": 2837,
    "Albilad": 2202,
    "Saudi Awwal Bank": 4000,
  },
  {
    year: "2012",
    "SAIB": 2954,
    "Albilad": 1240,
    "Saudi Awwal Bank": 4400,
  },
  {
    year: "2011",
    "SAIB": 3239,
    "Albilad": 1760,
    "Saudi Awwal Bank": 5000,
  },
];

//bankBarData received from server will also be called bankData
const bankBarData = [
  {
    year: "2022",
    "SAIB Income": 890,
    "SAIB Expense": 338,
  },
  {
    year: "2021",
    "SAIB Income": 289,
    "SAIB Expense": 233,
  },
  {
    year: "2020",
    "SAIB Income": 380,
    "SAIB Expense": 535,
  },
  {
    year: "2019",
    "SAIB Income": 289,
    "SAIB Expense": 233,
  },
  {
    year: "2018",
    "SAIB Income": 380,
    "SAIB Expense": 535,
  },
  {
    year: "2017",
    "SAIB Income": 90,
    "SAIB Expense": 98,
  },
  {
    year: "2016",
    "SAIB Income": 890,
    "SAIB Expense": 338,
  },
  {
    year: "2015",
    "SAIB Income": 90,
    "SAIB Expense": 98,
  },
];

const bankBarMultipleData = [
  {
    year: "2022",
    "SAIB Income": 890,
    "SAIB Expense": 338,
    "Albilad Income": 525,
    "Albilad Expense": 242,
    "Saudi Awwal Bank Income": 256,
    "Saudi Awwal Bank Expense": 255,
  },
  {
    year: "2021",
    "SAIB Income": 289,
    "SAIB Expense": 233,
    "Albilad Income": 845,
    "Albilad Expense": 368,
    "Saudi Awwal Bank Income": 260,
    "Saudi Awwal Bank Expense": 878,
  },
  {
    year: "2020",
    "SAIB Income": 380,
    "SAIB Expense": 535,
    "Albilad Income": 267,
    "Albilad Expense": 268,
    "Saudi Awwal Bank Income": 964,
    "Saudi Awwal Bank Expense": 257,
  },
  {
    year: "2019",
    "SAIB Income": 289,
    "SAIB Expense": 233,
    "Albilad Income": 953,
    "Albilad Expense": 378,
    "Saudi Awwal Bank Income": 784,
    "Saudi Awwal Bank Expense": 226,
  },
  {
    year: "2018",
    "SAIB Income": 380,
    "SAIB Expense": 535,
    "Albilad Income": 743,
    "Albilad Expense": 267,
    "Saudi Awwal Bank Income": 842,
    "Saudi Awwal Bank Expense": 784,
  },
  {
    year: "2017",
    "SAIB Income": 90,
    "SAIB Expense": 98,
    "Albilad Income": 268,
    "Albilad Expense": 367,
    "Saudi Awwal Bank Income": 864,
    "Saudi Awwal Bank Expense": 373,
  },
  {
    year: "2016",
    "SAIB Income": 890,
    "SAIB Expense": 338,
    "Albilad Income": 367,
    "Albilad Expense": 267,
    "Saudi Awwal Bank Income": 374,
    "Saudi Awwal Bank Expense": 266,
  },
  {
    year: "2015",
    "SAIB Income": 90,
    "SAIB Expense": 98,
    "Albilad Income": 372,
    "Albilad Expense": 488,
    "Saudi Awwal Bank Income": 478,
    "Saudi Awwal Bank Expense": 373,
  },
];

const totalGrossLoansData = [
  {
    category: 'Retail',
  },
  {
    category: 'Corporate',
  },
  {
    category: 'Total',
  }
];

//get this data by fetching bank data by category and subcategory merge them to form this data object array and sort it by year
const tableData = [
  {
    id: '1',
    year: '2024',
    'SAIB': '16.54',
    'Bank Albilad': '23.54',
    'SAB': '22.56'
  },
  {
    id: '2',
    year: '2023',
    'SAIB': '13.54',
    'Bank Albilad': '13.4',
    'SAB': '16.4'
  },
  {
    id: '3',
    year: '2022',
    'SAIB': '21.46',
    'Bank Albilad': '71.4',
    'SAB': '13.42'
  },
  {
    id: '4',
    year: '2021',
    'SAIB': '61.42',
    'Bank Albilad': '1.43',
    'SAB': '21.46'
  },
  {
    id: '5',
    year: '2020',
    'SAIB': '61.42',
    'Bank Albilad': '11.45',
    'SAB': '13.48'
  },
  {
    id: '6',
    year: '2019',
    'SAIB': '61.43',
    'Bank Albilad': '21.43',
    'SAB': '81.43'
  },
  {
    id: '7',
    year: '2018',
    'SAIB': '16.34',
    'Bank Albilad': '12.46',
    'SAB': '19.41'
  },
  {
    id: '8',
    year: '2017',
    'SAIB': '61.42',
    'Bank Albilad': '61.44',
    'SAB': '13.41'
  },
  {
    id: '9',
    year: '2016',
    'SAIB': '10.47',
    'Bank Albilad': '12.64',
    'SAB': '12.42'
  },
  {
    id: '10',
    year: '2015',
    'SAIB': '61.43',
    'Bank Albilad': '81.42',
    'SAB': '13.45'
  },
  {
    id: '11',
    year: '2014',
    'SAIB': '11.46',
    'Bank Albilad': '71.34',
    'SAB': '61.4'
  },
  {
    id: '12',
    year: '2013',
    'SAIB': '21.64',
    'Bank Albilad': '71.41',
    'SAB': '11.24'
  },
  {
    id: '13',
    year: '2012',
    'SAIB': '81.14',
    'Bank Albilad': '19.34',
    'SAB': '11.45'
  },
  {
    id: '14',
    year: '2011',
    'SAIB': '91.43',
    'Bank Albilad': '51.24',
    'SAB': '21.48'
  },
  {
    id: '15',
    year: '2010',
    'SAIB': '11.48',
    'Bank Albilad': '19.40',
    'SAB': '71.42'
  },
  {
    id: '16',
    year: '2009',
    'SAIB': '11.49',
    'Bank Albilad': '11.40',
    'SAB': '16.54'
  },
  {
    id: '17',
    year: '2008',
    'SAIB': '91.41',
    'Bank Albilad': '71.14',
    'SAB': '51.44'
  },
  {
    id: '18',
    year: '2007',
    'SAIB': '31.42',
    'Bank Albilad': '91.94',
    'SAB': '10.48'
  },
  {
    id: '19',
    year: '2006',
    'SAIB': '16.43',
    'Bank Albilad': '21.48',
    'SAB': '21.94'
  },
  {
    id: '20',
    year: '2005',
    'SAIB': '61.47',
    'Bank Albilad': '11.48',
    'SAB': '21.94'
  },
]

const tableColData = [
  {
    'id': '1',
    bank: 'SAIB',
    '2024': '16.54',
    '2023': '13.54',
    '2022': '21.46',
    '2021': '61.42',
    '2020': '61.42',
    '2019': '61.43',
    '2018': '16.34',
    '2017': '61.42',
    '2016': '10.47',
    '2015': '61.43',
    '2014': '11.46',
    '2013': '71.34',
    '2012': '21.64',
    '2011': '81.14',
    '2010': '91.43',
  },
  {
    'id': '2',
    bank: 'Bank Albilad',
    '2024': '23.54',
    '2023': '13.4',
    '2022': '71.4',
    '2021': '11.43',
    '2020': '11.45',
    '2019': '21.43',
    '2018': '12.46',
    '2017': '61.44',
    '2016': '12.64',
    '2015': '81.42',
    '2014': '71.34',
    '2013': '61.4',
    '2012': '71.41',
    '2011': '19.34',
    '2010': '51.24',
  },
  {
    'id': '3',
    bank: 'SAB',
    '2024': '22.56',
    '2023': '16.4',
    '2022': '13.42',
    '2021': '21.46',
    '2020': '13.48',
    '2019': '81.43',
    '2018': '19.41',
    '2017': '13.41',
    '2016': '12.42',
    '2015': '13.45',
    '2014': '61.4',
    '2013': '12.42',
    '2012': '11.24',
    '2011': '11.45',
    '2010': '21.48',
  }
]

const totalDepositsData = [
  {
    category: 'Demand',
  },
  {
    category: 'Savings',
  },
  {
    category: 'Total',
  }
];

export { competitionData, banks, analysisCategories, bankData, bankMultipleData, bankBarData, bankBarMultipleData, totalGrossLoansData, tableData, tableColData, totalDepositsData };
