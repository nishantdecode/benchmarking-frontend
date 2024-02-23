const balanceSheetCategories = [
  {
    name: "Demand Deposits",
  },
  {
    name: "T & S Deposits",
  },
  {
    name: "Total Deposits",
  },
  {
    name: "Investments",
  },
  {
    name: "Assets",
  },
  {
    name: "LCs",
  },
  {
    name: "LGs",
  },
  {
    name: "Trade Finance",
  },
  {
    name: "Retail Performing Loans",
  },
  {
    name: "Corporate & other Performance",
  },
  {
    name: "Total Loans (Net)",
  },
];

const balanceSheetData = [
  {
    id: "1",
    bank: "SAIB",
    2024: {
      value: "67.8",
      rank: "3",
    },
    2023: {
      value: "49.5",
      rank: "7",
    },
    2022: {
      value: "82.1",
      rank: "1",
    },
    2021: {
      value: "38.6",
      rank: "10",
    },
    2020: {
      value: "75.4",
      rank: "2",
    },
    2019: {
      value: "61.2",
      rank: "5",
    },
    2018: {
      value: "45.9",
      rank: "8",
    },
    2017: {
      value: "53.7",
      rank: "6",
    },
    2016: {
      value: "72.3",
      rank: "4",
    },
    2015: {
      value: "91.8",
      rank: "1",
    },
    2014: {
      value: "67.4",
      rank: "3",
    },
    2013: {
      value: "35.6",
      rank: "10",
    },
    2012: {
      value: "49.2",
      rank: "8",
    },
    2011: {
      value: "83.2",
      rank: "2",
    },
    2010: {
      value: "57.1",
      rank: "7",
    },
  },
  {
    id: "2",
    bank: "Bank Albilad",
    2024: {
      value: "28.4",
      rank: "9",
    },
    2023: {
      value: "56.2",
      rank: "6",
    },
    2022: {
      value: "72.9",
      rank: "2",
    },
    2021: {
      value: "41.7",
      rank: "8",
    },
    2020: {
      value: "64.3",
      rank: "4",
    },
    2019: {
      value: "35.9",
      rank: "10",
    },
    2018: {
      value: "53.6",
      rank: "5",
    },
    2017: {
      value: "19.4",
      rank: "10",
    },
    2016: {
      value: "45.2",
      rank: "7",
    },
    2015: {
      value: "67.8",
      rank: "3",
    },
    2014: {
      value: "83.1",
      rank: "1",
    },
    2013: {
      value: "57.9",
      rank: "4",
    },
    2012: {
      value: "29.5",
      rank: "9",
    },
    2011: {
      value: "48.7",
      rank: "6",
    },
    2010: {
      value: "37.2",
      rank: "8",
    },
  },
  {
    id: "3",
    bank: "Saudi Awwal Bank",
    2024: {
      value: "63.2",
      rank: "4",
    },
    2023: {
      value: "42.1",
      rank: "8",
    },
    2022: {
      value: "71.8",
      rank: "2",
    },
    2021: {
      value: "54.7",
      rank: "6",
    },
    2020: {
      value: "79.4",
      rank: "1",
    },
    2019: {
      value: "35.6",
      rank: "10",
    },
    2018: {
      value: "48.9",
      rank: "7",
    },
    2017: {
      value: "29.5",
      rank: "9",
    },
    2016: {
      value: "41.2",
      rank: "8",
    },
    2015: {
      value: "63.8",
      rank: "5",
    },
    2014: {
      value: "72.1",
      rank: "3",
    },
    2013: {
      value: "84.7",
      rank: "1",
    },
    2012: {
      value: "57.6",
      rank: "4",
    },
    2011: {
      value: "38.2",
      rank: "9",
    },
    2010: {
      value: "46.9",
      rank: "6",
    },
  },
  {
    id: "4",
    bank: "Al-Rajhi Bank",
    2024: {
      value: "63.2",
      rank: "4",
    },
    2023: {
      value: "42.1",
      rank: "8",
    },
    2022: {
      value: "71.8",
      rank: "2",
    },
    2021: {
      value: "54.7",
      rank: "6",
    },
    2020: {
      value: "79.4",
      rank: "1",
    },
    2019: {
      value: "35.6",
      rank: "10",
    },
    2018: {
      value: "48.9",
      rank: "7",
    },
    2017: {
      value: "29.5",
      rank: "9",
    },
    2016: {
      value: "41.2",
      rank: "8",
    },
    2015: {
      value: "63.8",
      rank: "5",
    },
    2014: {
      value: "72.1",
      rank: "3",
    },
    2013: {
      value: "84.7",
      rank: "1",
    },
    2012: {
      value: "57.6",
      rank: "4",
    },
    2011: {
      value: "38.2",
      rank: "9",
    },
    2010: {
      value: "46.9",
      rank: "6",
    },
  },
  {
    id: "5",
    bank: "Arab National Bank",
    2024: {
      value: "63.2",
      rank: "4",
    },
    2023: {
      value: "42.1",
      rank: "8",
    },
    2022: {
      value: "71.8",
      rank: "2",
    },
    2021: {
      value: "54.7",
      rank: "6",
    },
    2020: {
      value: "79.4",
      rank: "1",
    },
    2019: {
      value: "35.6",
      rank: "10",
    },
    2018: {
      value: "48.9",
      rank: "7",
    },
    2017: {
      value: "29.5",
      rank: "9",
    },
    2016: {
      value: "41.2",
      rank: "8",
    },
    2015: {
      value: "63.8",
      rank: "5",
    },
    2014: {
      value: "72.1",
      rank: "3",
    },
    2013: {
      value: "84.7",
      rank: "1",
    },
    2012: {
      value: "57.6",
      rank: "4",
    },
    2011: {
      value: "38.2",
      rank: "9",
    },
    2010: {
      value: "46.9",
      rank: "6",
    },
  },
  {
    id: "6",
    bank: "SAB",
    2024: {
      value: "63.2",
      rank: "4",
    },
    2023: {
      value: "42.1",
      rank: "8",
    },
    2022: {
      value: "71.8",
      rank: "2",
    },
    2021: {
      value: "54.7",
      rank: "6",
    },
    2020: {
      value: "79.4",
      rank: "1",
    },
    2019: {
      value: "35.6",
      rank: "10",
    },
    2018: {
      value: "48.9",
      rank: "7",
    },
    2017: {
      value: "29.5",
      rank: "9",
    },
    2016: {
      value: "41.2",
      rank: "8",
    },
    2015: {
      value: "63.8",
      rank: "5",
    },
    2014: {
      value: "72.1",
      rank: "3",
    },
    2013: {
      value: "84.7",
      rank: "1",
    },
    2012: {
      value: "57.6",
      rank: "4",
    },
    2011: {
      value: "38.2",
      rank: "9",
    },
    2010: {
      value: "46.9",
      rank: "6",
    },
  },
  {
    id: "7",
    bank: "Bank Aljazira",
    2024: {
      value: "63.2",
      rank: "4",
    },
    2023: {
      value: "42.1",
      rank: "8",
    },
    2022: {
      value: "71.8",
      rank: "2",
    },
    2021: {
      value: "54.7",
      rank: "6",
    },
    2020: {
      value: "79.4",
      rank: "1",
    },
    2019: {
      value: "35.6",
      rank: "10",
    },
    2018: {
      value: "48.9",
      rank: "7",
    },
    2017: {
      value: "29.5",
      rank: "9",
    },
    2016: {
      value: "41.2",
      rank: "8",
    },
    2015: {
      value: "63.8",
      rank: "5",
    },
    2014: {
      value: "72.1",
      rank: "3",
    },
    2013: {
      value: "84.7",
      rank: "1",
    },
    2012: {
      value: "57.6",
      rank: "4",
    },
    2011: {
      value: "38.2",
      rank: "9",
    },
    2010: {
      value: "46.9",
      rank: "6",
    },
  },
  {
    id: "8",
    bank: "Saudi National Bank",
    2024: {
      value: "63.2",
      rank: "4",
    },
    2023: {
      value: "42.1",
      rank: "8",
    },
    2022: {
      value: "71.8",
      rank: "2",
    },
    2021: {
      value: "54.7",
      rank: "6",
    },
    2020: {
      value: "79.4",
      rank: "1",
    },
    2019: {
      value: "35.6",
      rank: "10",
    },
    2018: {
      value: "48.9",
      rank: "7",
    },
    2017: {
      value: "29.5",
      rank: "9",
    },
    2016: {
      value: "41.2",
      rank: "8",
    },
    2015: {
      value: "63.8",
      rank: "5",
    },
    2014: {
      value: "72.1",
      rank: "3",
    },
    2013: {
      value: "84.7",
      rank: "1",
    },
    2012: {
      value: "57.6",
      rank: "4",
    },
    2011: {
      value: "38.2",
      rank: "9",
    },
    2010: {
      value: "46.9",
      rank: "6",
    },
  },
  {
    id: "9",
    bank: "Riyad bank",
    2024: {
      value: "63.2",
      rank: "4",
    },
    2023: {
      value: "42.1",
      rank: "8",
    },
    2022: {
      value: "71.8",
      rank: "2",
    },
    2021: {
      value: "54.7",
      rank: "6",
    },
    2020: {
      value: "79.4",
      rank: "1",
    },
    2019: {
      value: "35.6",
      rank: "10",
    },
    2018: {
      value: "48.9",
      rank: "7",
    },
    2017: {
      value: "29.5",
      rank: "9",
    },
    2016: {
      value: "41.2",
      rank: "8",
    },
    2015: {
      value: "63.8",
      rank: "5",
    },
    2014: {
      value: "72.1",
      rank: "3",
    },
    2013: {
      value: "84.7",
      rank: "1",
    },
    2012: {
      value: "57.6",
      rank: "4",
    },
    2011: {
      value: "38.2",
      rank: "9",
    },
    2010: {
      value: "46.9",
      rank: "6",
    },
  },
  {
    id: "10",
    bank: "Bank Saudi Fransi",
    2024: {
      value: "63.2",
      rank: "4",
    },
    2023: {
      value: "42.1",
      rank: "8",
    },
    2022: {
      value: "71.8",
      rank: "2",
    },
    2021: {
      value: "54.7",
      rank: "6",
    },
    2020: {
      value: "79.4",
      rank: "1",
    },
    2019: {
      value: "35.6",
      rank: "10",
    },
    2018: {
      value: "48.9",
      rank: "7",
    },
    2017: {
      value: "29.5",
      rank: "9",
    },
    2016: {
      value: "41.2",
      rank: "8",
    },
    2015: {
      value: "63.8",
      rank: "5",
    },
    2014: {
      value: "72.1",
      rank: "3",
    },
    2013: {
      value: "84.7",
      rank: "1",
    },
    2012: {
      value: "57.6",
      rank: "4",
    },
    2011: {
      value: "38.2",
      rank: "9",
    },
    2010: {
      value: "46.9",
      rank: "6",
    },
  },
];

// generate raw data objects in this object array in the format for all banks provided:
const tableColData = [
  {
    id: "1",
    bank: "SAIB",
    2024: {
      value: "", //generate random decimal value between 10.0 and 100.0
      rank: "", //for all objects generated assign a rank between 1 and 10 by comparing values of all banks of this year
    },
    2023: {
      value: "", //generate random decimal value between 10.0 and 100.0
      rank: "", //for all objects generated assign a rank between 1 and 10 by comparing values of all banks of this year
    },
    2022: {
      value: "", //generate random decimal value between 10.0 and 100.0
      rank: "", //for all objects generated assign a rank between 1 and 10 by comparing values of all banks of this year
    },
    2021: {
      value: "", //generate random decimal value between 10.0 and 100.0
      rank: "", //for all objects generated assign a rank between 1 and 10 by comparing values of all banks of this year
    },
    2020: {
      value: "", //generate random decimal value between 10.0 and 100.0
      rank: "", //for all objects generated assign a rank between 1 and 10 by comparing values of all banks of this year
    },
    2019: {
      value: "", //generate random decimal value between 10.0 and 100.0
      rank: "", //for all objects generated assign a rank between 1 and 10 by comparing values of all banks of this year
    },
    2018: {
      value: "", //generate random decimal value between 10.0 and 100.0
      rank: "", //for all objects generated assign a rank between 1 and 10 by comparing values of all banks of this year
    },
    2017: {
      value: "", //generate random decimal value between 10.0 and 100.0
      rank: "", //for all objects generated assign a rank between 1 and 10 by comparing values of all banks of this year
    },
    2016: {
      value: "", //generate random decimal value between 10.0 and 100.0
      rank: "", //for all objects generated assign a rank between 1 and 10 by comparing values of all banks of this year
    },
    2015: {
      value: "", //generate random decimal value between 10.0 and 100.0
      rank: "", //for all objects generated assign a rank between 1 and 10 by comparing values of all banks of this year
    },
    2014: {
      value: "", //generate random decimal value between 10.0 and 100.0
      rank: "", //for all objects generated assign a rank between 1 and 10 by comparing values of all banks of this year
    },
    2013: {
      value: "", //generate random decimal value between 10.0 and 100.0
      rank: "", //for all objects generated assign a rank between 1 and 10 by comparing values of all banks of this year
    },
    2012: {
      value: "", //generate random decimal value between 10.0 and 100.0
      rank: "", //for all objects generated assign a rank between 1 and 10 by comparing values of all banks of this year
    },
    2011: {
      value: "", //generate random decimal value between 10.0 and 100.0
      rank: "", //for all objects generated assign a rank between 1 and 10 by comparing values of all banks of this year
    },
    2010: {
      value: "", //generate random decimal value between 10.0 and 100.0
      rank: "", //for all objects generated assign a rank between 1 and 10 by comparing values of all banks of this year
    },
  },
  // follow above pattern make more data objects using all banks provided provided
];

const msBalanceSheetCategories = [
  {
    name: "MS-Demand Deposits",
  },
  {
    name: "MS-T & S Deposits",
  },
  {
    name: "MS-Total Deposits",
  },
  {
    name: "MS-Investments",
  },
  {
    name: "MS-Assets",
  },
  {
    name: "MS-LCs",
  },
  {
    name: "MS-LGs",
  },
  {
    name: "MS-Trade Finance",
  },
  {
    name: "MS-Retail Performing Loans",
  },
  {
    name: "MS-Corporate & other Performance",
  },
  {
    name: "MS-Total Loans (Net)",
  },
];

const msBalanceSheetData = [
  {
    id: "1",
    bank: "SAIB",
    2024: {
      value: "43.7",
      share: "12.8",
    },
    2023: {
      value: "57.2",
      share: "9.5",
    },
    2022: {
      value: "68.4",
      share: "15.2",
    },
    2021: {
      value: "32.5",
      share: "7.3",
    },
    2020: {
      value: "79.6",
      share: "22.1",
    },
    2019: {
      value: "41.3",
      share: "9.6",
    },
    2018: {
      value: "59.8",
      share: "12.4",
    },
    2017: {
      value: "27.9",
      share: "8.2",
    },
    2016: {
      value: "45.6",
      share: "13.1",
    },
    2015: {
      value: "72.1",
      share: "18.7",
    },
    2014: {
      value: "69.4",
      share: "16.2",
    },
    2013: {
      value: "38.5",
      share: "10.4",
    },
    2012: {
      value: "54.2",
      share: "14.3",
    },
    2011: {
      value: "78.9",
      share: "19.8",
    },
    2010: {
      value: "51.7",
      share: "13.9",
    },
  },
  {
    id: "2",
    bank: "Bank Albilad",
    2024: {
      value: "39.4",
      share: "11.7",
    },
    2023: {
      value: "45.2",
      share: "8.9",
    },
    2022: {
      value: "57.8",
      share: "14.2",
    },
    2021: {
      value: "28.7",
      share: "6.5",
    },
    2020: {
      value: "69.5",
      share: "21.3",
    },
    2019: {
      value: "37.8",
      share: "8.2",
    },
    2018: {
      value: "51.3",
      share: "11.1",
    },
    2017: {
      value: "25.9",
      share: "7.6",
    },
    2016: {
      value: "41.5",
      share: "12.3",
    },
    2015: {
      value: "64.8",
      share: "17.6",
    },
    2014: {
      value: "67.2",
      share: "15.9",
    },
    2013: {
      value: "35.7",
      share: "9.5",
    },
    2012: {
      value: "48.9",
      share: "13.2",
    },
    2011: {
      value: "75.6",
      share: "18.9",
    },
    2010: {
      value: "49.4",
      share: "14.3",
    },
  },
  {
    id: "3",
    bank: "Saudi Awwal Bank",
    2024: {
      value: "49.6",
      share: "14.1",
    },
    2023: {
      value: "61.8",
      share: "10.5",
    },
    2022: {
      value: "72.1",
      share: "16.5",
    },
    2021: {
      value: "37.4",
      share: "8.3",
    },
    2020: {
      value: "78.9",
      share: "23.1",
    },
    2019: {
      value: "43.6",
      share: "10.2",
    },
    2018: {
      value: "58.2",
      share: "12.8",
    },
    2017: {
      value: "31.5",
      share: "9.3",
    },
    2016: {
      value: "47.2",
      share: "14.2",
    },
    2015: {
      value: "69.4",
      share: "18.6",
    },
    2014: {
      value: "71.8",
      share: "16.8",
    },
    2013: {
      value: "39.5",
      share: "10.8",
    },
    2012: {
      value: "52.4",
      share: "13.9",
    },
    2011: {
      value: "77.1",
      share: "19.5",
    },
    2010: {
      value: "53.2",
      share: "14.6",
    },
  },
  {
    id: "4",
    bank: "Al-Rajhi Bank",
    2024: {
      value: "49.6",
      share: "14.1",
    },
    2023: {
      value: "61.8",
      share: "10.5",
    },
    2022: {
      value: "72.1",
      share: "16.5",
    },
    2021: {
      value: "37.4",
      share: "8.3",
    },
    2020: {
      value: "78.9",
      share: "23.1",
    },
    2019: {
      value: "43.6",
      share: "10.2",
    },
    2018: {
      value: "58.2",
      share: "12.8",
    },
    2017: {
      value: "31.5",
      share: "9.3",
    },
    2016: {
      value: "47.2",
      share: "14.2",
    },
    2015: {
      value: "69.4",
      share: "18.6",
    },
    2014: {
      value: "71.8",
      share: "16.8",
    },
    2013: {
      value: "39.5",
      share: "10.8",
    },
    2012: {
      value: "52.4",
      share: "13.9",
    },
    2011: {
      value: "77.1",
      share: "19.5",
    },
    2010: {
      value: "53.2",
      share: "14.6",
    },
  },
  {
    id: "5",
    bank: "Arab National Bank",
    2024: {
      value: "49.6",
      share: "14.1",
    },
    2023: {
      value: "61.8",
      share: "10.5",
    },
    2022: {
      value: "72.1",
      share: "16.5",
    },
    2021: {
      value: "37.4",
      share: "8.3",
    },
    2020: {
      value: "78.9",
      share: "23.1",
    },
    2019: {
      value: "43.6",
      share: "10.2",
    },
    2018: {
      value: "58.2",
      share: "12.8",
    },
    2017: {
      value: "31.5",
      share: "9.3",
    },
    2016: {
      value: "47.2",
      share: "14.2",
    },
    2015: {
      value: "69.4",
      share: "18.6",
    },
    2014: {
      value: "71.8",
      share: "16.8",
    },
    2013: {
      value: "39.5",
      share: "10.8",
    },
    2012: {
      value: "52.4",
      share: "13.9",
    },
    2011: {
      value: "77.1",
      share: "19.5",
    },
    2010: {
      value: "53.2",
      share: "14.6",
    },
  },
  {
    id: "6",
    bank: "SAB",
    2024: {
      value: "49.6",
      share: "14.1",
    },
    2023: {
      value: "61.8",
      share: "10.5",
    },
    2022: {
      value: "72.1",
      share: "16.5",
    },
    2021: {
      value: "37.4",
      share: "8.3",
    },
    2020: {
      value: "78.9",
      share: "23.1",
    },
    2019: {
      value: "43.6",
      share: "10.2",
    },
    2018: {
      value: "58.2",
      share: "12.8",
    },
    2017: {
      value: "31.5",
      share: "9.3",
    },
    2016: {
      value: "47.2",
      share: "14.2",
    },
    2015: {
      value: "69.4",
      share: "18.6",
    },
    2014: {
      value: "71.8",
      share: "16.8",
    },
    2013: {
      value: "39.5",
      share: "10.8",
    },
    2012: {
      value: "52.4",
      share: "13.9",
    },
    2011: {
      value: "77.1",
      share: "19.5",
    },
    2010: {
      value: "53.2",
      share: "14.6",
    },
  },
  {
    id: "7",
    bank: "Bank Aljazira",
    2024: {
      value: "49.6",
      share: "14.1",
    },
    2023: {
      value: "61.8",
      share: "10.5",
    },
    2022: {
      value: "72.1",
      share: "16.5",
    },
    2021: {
      value: "37.4",
      share: "8.3",
    },
    2020: {
      value: "78.9",
      share: "23.1",
    },
    2019: {
      value: "43.6",
      share: "10.2",
    },
    2018: {
      value: "58.2",
      share: "12.8",
    },
    2017: {
      value: "31.5",
      share: "9.3",
    },
    2016: {
      value: "47.2",
      share: "14.2",
    },
    2015: {
      value: "69.4",
      share: "18.6",
    },
    2014: {
      value: "71.8",
      share: "16.8",
    },
    2013: {
      value: "39.5",
      share: "10.8",
    },
    2012: {
      value: "52.4",
      share: "13.9",
    },
    2011: {
      value: "77.1",
      share: "19.5",
    },
    2010: {
      value: "53.2",
      share: "14.6",
    },
  },
  {
    id: "8",
    bank: "Saudi National Bank",
    2024: {
      value: "49.6",
      share: "14.1",
    },
    2023: {
      value: "61.8",
      share: "10.5",
    },
    2022: {
      value: "72.1",
      share: "16.5",
    },
    2021: {
      value: "37.4",
      share: "8.3",
    },
    2020: {
      value: "78.9",
      share: "23.1",
    },
    2019: {
      value: "43.6",
      share: "10.2",
    },
    2018: {
      value: "58.2",
      share: "12.8",
    },
    2017: {
      value: "31.5",
      share: "9.3",
    },
    2016: {
      value: "47.2",
      share: "14.2",
    },
    2015: {
      value: "69.4",
      share: "18.6",
    },
    2014: {
      value: "71.8",
      share: "16.8",
    },
    2013: {
      value: "39.5",
      share: "10.8",
    },
    2012: {
      value: "52.4",
      share: "13.9",
    },
    2011: {
      value: "77.1",
      share: "19.5",
    },
    2010: {
      value: "53.2",
      share: "14.6",
    },
  },
  {
    id: "9",
    bank: "Riyad bank",
    2024: {
      value: "49.6",
      share: "14.1",
    },
    2023: {
      value: "61.8",
      share: "10.5",
    },
    2022: {
      value: "72.1",
      share: "16.5",
    },
    2021: {
      value: "37.4",
      share: "8.3",
    },
    2020: {
      value: "78.9",
      share: "23.1",
    },
    2019: {
      value: "43.6",
      share: "10.2",
    },
    2018: {
      value: "58.2",
      share: "12.8",
    },
    2017: {
      value: "31.5",
      share: "9.3",
    },
    2016: {
      value: "47.2",
      share: "14.2",
    },
    2015: {
      value: "69.4",
      share: "18.6",
    },
    2014: {
      value: "71.8",
      share: "16.8",
    },
    2013: {
      value: "39.5",
      share: "10.8",
    },
    2012: {
      value: "52.4",
      share: "13.9",
    },
    2011: {
      value: "77.1",
      share: "19.5",
    },
    2010: {
      value: "53.2",
      share: "14.6",
    },
  },
  {
    id: "10",
    bank: "Bank Saudi Fransi",
    2024: {
      value: "49.6",
      share: "14.1",
    },
    2023: {
      value: "61.8",
      share: "10.5",
    },
    2022: {
      value: "72.1",
      share: "16.5",
    },
    2021: {
      value: "37.4",
      share: "8.3",
    },
    2020: {
      value: "78.9",
      share: "23.1",
    },
    2019: {
      value: "43.6",
      share: "10.2",
    },
    2018: {
      value: "58.2",
      share: "12.8",
    },
    2017: {
      value: "31.5",
      share: "9.3",
    },
    2016: {
      value: "47.2",
      share: "14.2",
    },
    2015: {
      value: "69.4",
      share: "18.6",
    },
    2014: {
      value: "71.8",
      share: "16.8",
    },
    2013: {
      value: "39.5",
      share: "10.8",
    },
    2012: {
      value: "52.4",
      share: "13.9",
    },
    2011: {
      value: "77.1",
      share: "19.5",
    },
    2010: {
      value: "53.2",
      share: "14.6",
    },
  },
];

// generate raw data objects in this object array in the format for all banks provided:
const dummyData = [
  {
    id: "1",
    bank: "SAIB",
    2024: {
      value: "", //generate random decimal value between 10.0 and 100.0
      share: "", //generate random decimal value between 10.0 and 100.0
    },
    2023: {
      value: "", //generate random decimal value between 10.0 and 100.0
      share: "", //generate random decimal value between 10.0 and 100.0
    },
    2022: {
      value: "", //generate random decimal value between 10.0 and 100.0
      share: "", //generate random decimal value between 10.0 and 100.0
    },
    2021: {
      value: "", //generate random decimal value between 10.0 and 100.0
      share: "", //generate random decimal value between 10.0 and 100.0
    },
    2020: {
      value: "", //generate random decimal value between 10.0 and 100.0
      share: "", //generate random decimal value between 10.0 and 100.0
    },
    2019: {
      value: "", //generate random decimal value between 10.0 and 100.0
      share: "", //generate random decimal value between 10.0 and 100.0
    },
    2018: {
      value: "", //generate random decimal value between 10.0 and 100.0
      share: "", //generate random decimal value between 10.0 and 100.0
    },
    2017: {
      value: "", //generate random decimal value between 10.0 and 100.0
      share: "", //generate random decimal value between 10.0 and 100.0
    },
    2016: {
      value: "", //generate random decimal value between 10.0 and 100.0
      share: "", //generate random decimal value between 10.0 and 100.0
    },
    2015: {
      value: "", //generate random decimal value between 10.0 and 100.0
      share: "", //generate random decimal value between 10.0 and 100.0
    },
    2014: {
      value: "", //generate random decimal value between 10.0 and 100.0
      share: "", //generate random decimal value between 10.0 and 100.0
    },
    2013: {
      value: "", //generate random decimal value between 10.0 and 100.0
      share: "", //generate random decimal value between 10.0 and 100.0
    },
    2012: {
      value: "", //generate random decimal value between 10.0 and 100.0
      share: "", //generate random decimal value between 10.0 and 100.0
    },
    2011: {
      value: "", //generate random decimal value between 10.0 and 100.0
      share: "", //generate random decimal value between 10.0 and 100.0
    },
    2010: {
      value: "", //generate random decimal value between 10.0 and 100.0
      share: "", //generate random decimal value between 10.0 and 100.0
    },
  },
  // follow above pattern make more data objects using all banks provided provided
];

const incomeStatementCategories = [
  {
    name: "Gross Yield",
  },
  {
    name: "CoF",
  },
  {
    name: "Net Yield Income",
  },
  {
    name: "FX",
  },
  {
    name: "Other Income",
  },
  {
    name: "Operating Income",
  },
  {
    name: "Salaries & Employee relation",
  },
  {
    name: "Depreciation & Amortisation",
  },
  {
    name: "Other Gen & Admin expenses",
  },
  {
    name: "Operating Expenses",
  },
  {
    name: "Provisions(Loans+Investments)",
  },
  {
    name: "Income before Provisions",
  },
  {
    name: "Income before Zakat",
  },
  {
    name: "Net Income",
  },
];

const msIncomeStatementCategories = [
  {
    name: "MS-Gross Yield",
  },
  {
    name: "MS-CoF",
  },
  {
    name: "MS-Net Yield Income",
  },
  {
    name: "MS-FX",
  },
  {
    name: "MS-Other Income",
  },
  {
    name: "MS-Operating Income",
  },
  {
    name: "MS-Salaries & Employee relation",
  },
  {
    name: "MS-Depreciation & Amortisation",
  },
  {
    name: "MS-Other Gen & Admin expenses",
  },
  {
    name: "MS-Operating Expenses",
  },
  {
    name: "MS-Provisions(Loans+Investments)",
  },
  {
    name: "MS-Income before Provisions",
  },
  {
    name: "MS-Income before Zakat",
  },
  {
    name: "MS-Net Income",
  },
];

const ratioCategories = [
  {
    name: "Cost / Income %",
  },
  {
    name: "ROA %",
  },
  {
    name: "ROE %",
  },
  {
    name: "NIM %",
  },
  {
    name: "CoF (all deposit)",
  },
  {
    name: "Cost of Risk %",
  },
  {
    name: "NPL Coverage %",
  },
  {
    name: "NBL/Gross Loans %",
  },
  {
    name: "Allowance/Gross Loans%",
  },
  {
    name: "Loans/Deposit %",
  },
  {
    name: "CAR (Tier 1) %",
  },
  {
    name: "CAR (Tier 1+2) %",
  },
  {
    name: "Non-commission bearings",
  },
];

const ratioData = [
  {
    id: "1",
    bank: "SAIB",
    2024: "43.7",
    2023: "57.2",
    2022: "68.4",
    2021: "32.5",
    2020: "79.6",
    2019: "41.3",
    2018: "59.8",
    2017: "27.9",
    2016: "45.6",
    2015: "72.1",
    2014: "69.4",
    2013: "38.5",
    2012: "54.2",
    2011: "78.9",
    2010: "51.7",
  },
  {
    id: "2",
    bank: "Bank Albilad",
    2024: "43.7",
    2023: "57.2",
    2022: "68.4",
    2021: "32.5",
    2020: "79.6",
    2019: "41.3",
    2018: "59.8",
    2017: "27.9",
    2016: "45.6",
    2015: "72.1",
    2014: "69.4",
    2013: "38.5",
    2012: "54.2",
    2011: "78.9",
    2010: "51.7",
  },
  {
    id: "3",
    bank: "Saudi Awwal Bank",
    2024: "43.7",
    2023: "57.2",
    2022: "68.4",
    2021: "32.5",
    2020: "79.6",
    2019: "41.3",
    2018: "59.8",
    2017: "27.9",
    2016: "45.6",
    2015: "72.1",
    2014: "69.4",
    2013: "38.5",
    2012: "54.2",
    2011: "78.9",
    2010: "51.7",
  },
  {
    id: "4",
    bank: "Al-Rajhi Bank",
    2024: "43.7",
    2023: "57.2",
    2022: "68.4",
    2021: "32.5",
    2020: "79.6",
    2019: "41.3",
    2018: "59.8",
    2017: "27.9",
    2016: "45.6",
    2015: "72.1",
    2014: "69.4",
    2013: "38.5",
    2012: "54.2",
    2011: "78.9",
    2010: "51.7",
  },
  {
    id: "5",
    bank: "Arab National Bank",
    2024: "43.7",
    2023: "57.2",
    2022: "68.4",
    2021: "32.5",
    2020: "79.6",
    2019: "41.3",
    2018: "59.8",
    2017: "27.9",
    2016: "45.6",
    2015: "72.1",
    2014: "69.4",
    2013: "38.5",
    2012: "54.2",
    2011: "78.9",
    2010: "51.7",
  },
  {
    id: "6",
    bank: "SAB",
    2024: "43.7",
    2023: "57.2",
    2022: "68.4",
    2021: "32.5",
    2020: "79.6",
    2019: "41.3",
    2018: "59.8",
    2017: "27.9",
    2016: "45.6",
    2015: "72.1",
    2014: "69.4",
    2013: "38.5",
    2012: "54.2",
    2011: "78.9",
    2010: "51.7",
  },
  {
    id: "7",
    bank: "Bank Aljazira",
    2024: "43.7",
    2023: "57.2",
    2022: "68.4",
    2021: "32.5",
    2020: "79.6",
    2019: "41.3",
    2018: "59.8",
    2017: "27.9",
    2016: "45.6",
    2015: "72.1",
    2014: "69.4",
    2013: "38.5",
    2012: "54.2",
    2011: "78.9",
    2010: "51.7",
  },
  {
    id: "8",
    bank: "Saudi National Bank",
    2024: "43.7",
    2023: "57.2",
    2022: "68.4",
    2021: "32.5",
    2020: "79.6",
    2019: "41.3",
    2018: "59.8",
    2017: "27.9",
    2016: "45.6",
    2015: "72.1",
    2014: "69.4",
    2013: "38.5",
    2012: "54.2",
    2011: "78.9",
    2010: "51.7",
  },
  {
    id: "9",
    bank: "Riyad bank",
    2024: "43.7",
    2023: "57.2",
    2022: "68.4",
    2021: "32.5",
    2020: "79.6",
    2019: "41.3",
    2018: "59.8",
    2017: "27.9",
    2016: "45.6",
    2015: "72.1",
    2014: "69.4",
    2013: "38.5",
    2012: "54.2",
    2011: "78.9",
    2010: "51.7",
  },
  {
    id: "10",
    bank: "Bank Saudi Fransi",
    2024: "43.7",
    2023: "57.2",
    2022: "68.4",
    2021: "32.5",
    2020: "79.6",
    2019: "41.3",
    2018: "59.8",
    2017: "27.9",
    2016: "45.6",
    2015: "72.1",
    2014: "69.4",
    2013: "38.5",
    2012: "54.2",
    2011: "78.9",
    2010: "51.7",
  },
];

const dummyCategories = [
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
];

export {
  balanceSheetCategories,
  balanceSheetData,
  msBalanceSheetCategories,
  msBalanceSheetData,
  incomeStatementCategories,
  msIncomeStatementCategories,
  ratioCategories,
  ratioData
};
