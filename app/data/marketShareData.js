import { PiBankBold } from "react-icons/pi";

const individualBankMarketData = [
  {
    id: 1,
    year: 2024,
    "Total Loans(Net)": "17.1",
    "Retail Loans (Gross)": "17.1",
    "Corporate & other Loans": "17.1",
    "Investments (Net)": "17.1",
    Assets: "17.1",
    "Total Deposits": "17.1",
    "Demand Deposits": "17.1",
    "TS Deposits": "17.1",
    LCs: "17.1",
    LGs: "17.1",
    "Total Trade Finance": "17.1",
    "Gross Yield": "17.1",
  },
  {
    id: 2,
    year: 2023,
    "Total Loans(Net)": "79.5",
    "Retail Loans (Gross)": "67.8",
    "Corporate & other Loans": "45.2",
    "Investments (Net)": "89.3",
    Assets: "54.7",
    "Total Deposits": "37.9",
    "Demand Deposits": "92.1",
    "TS Deposits": "30.8",
    LCs: "15.3",
    LGs: "48.6",
    "Total Trade Finance": "75.2",
    "Gross Yield": "22.9",
  },
  {
    id: 3,
    year: 2022,
    "Total Loans(Net)": "60.4",
    "Retail Loans (Gross)": "71.2",
    "Corporate & other Loans": "21.5",
    "Investments (Net)": "33.6",
    Assets: "88.7",
    "Total Deposits": "99.6",
    "Demand Deposits": "85.4",
    "TS Deposits": "51.9",
    LCs: "29.5",
    LGs: "83.7",
    "Total Trade Finance": "18.4",
    "Gross Yield": "97.2",
  },
  {
    id: 4,
    year: 2021,
    "Total Loans(Net)": "45.7",
    "Retail Loans (Gross)": "97.8",
    "Corporate & other Loans": "30.6",
    "Investments (Net)": "66.1",
    Assets: "22.8",
    "Total Deposits": "11.3",
    "Demand Deposits": "88.9",
    "TS Deposits": "83.7",
    LCs: "15.8",
    LGs: "21.7",
    "Total Trade Finance": "49.5",
    "Gross Yield": "91.5",
  },
  {
    id: 5,
    year: 2020,
    "Total Loans(Net)": "10.3",
    "Retail Loans (Gross)": "45.1",
    "Corporate & other Loans": "61.8",
    "Investments (Net)": "98.2",
    Assets: "63.6",
    "Total Deposits": "22.4",
    "Demand Deposits": "72.7",
    "TS Deposits": "12.6",
    LCs: "87.2",
    LGs: "97.7",
    "Total Trade Finance": "16.2",
    "Gross Yield": "36.7",
  },
  {
    id: 6,
    year: 2019,
    "Total Loans(Net)": "99.5",
    "Retail Loans (Gross)": "16.6",
    "Corporate & other Loans": "62.3",
    "Investments (Net)": "11.2",
    Assets: "30.4",
    "Total Deposits": "90.4",
    "Demand Deposits": "60.1",
    "TS Deposits": "41.5",
    LCs: "98.1",
    LGs: "85.5",
    "Total Trade Finance": "54.8",
    "Gross Yield": "19.5",
  },
  {
    id: 7,
    year: 2018,
    "Total Loans(Net)": "35.6",
    "Retail Loans (Gross)": "88.3",
    "Corporate & other Loans": "49.7",
    "Investments (Net)": "73.4",
    Assets: "27.9",
    "Total Deposits": "97.2",
    "Demand Deposits": "69.5",
    "TS Deposits": "11.8",
    LCs: "26.9",
    LGs: "54.3",
    "Total Trade Finance": "18.9",
    "Gross Yield": "84.5",
  },
  {
    id: 8,
    year: 2017,
    "Total Loans(Net)": "62.8",
    "Retail Loans (Gross)": "50.2",
    "Corporate & other Loans": "22.9",
    "Investments (Net)": "42.6",
    Assets: "75.9",
    "Total Deposits": "33.1",
    "Demand Deposits": "99.8",
    "TS Deposits": "80.2",
    LCs: "19.7",
    LGs: "14.6",
    "Total Trade Finance": "91.7",
    "Gross Yield": "28.4",
  },
  {
    id: 9,
    year: 2016,
    "Total Loans(Net)": "85.2",
    "Retail Loans (Gross)": "71.3",
    "Corporate & other Loans": "44.6",
    "Investments (Net)": "57.8",
    Assets: "12.1",
    "Total Deposits": "38.9",
    "Demand Deposits": "67.4",
    "TS Deposits": "29.1",
    LCs: "46.8",
    LGs: "87.6",
    "Total Trade Finance": "92.7",
    "Gross Yield": "61.9",
  },
  {
    id: 10,
    year: 2015,
    "Total Loans(Net)": "19.7",
    "Retail Loans (Gross)": "26.3",
    "Corporate & other Loans": "58.7",
    "Investments (Net)": "21.9",
    Assets: "71.4",
    "Total Deposits": "56.1",
    "Demand Deposits": "17.9",
    "TS Deposits": "91.3",
    LCs: "38.5",
    LGs: "71.7",
    "Total Trade Finance": "32.4",
    "Gross Yield": "13.2",
  },
  {
    id: 11,
    year: 2014,
    "Total Loans(Net)": "40.6",
    "Retail Loans (Gross)": "63.4",
    "Corporate & other Loans": "82.7",
    "Investments (Net)": "78.5",
    Assets: "91.3",
    "Total Deposits": "18.7",
    "Demand Deposits": "71.6",
    "TS Deposits": "40.3",
    LCs: "26.2",
    LGs: "14.7",
    "Total Trade Finance": "85.6",
    "Gross Yield": "72.4",
  },
  {
    id: 12,
    year: 2013,
    "Total Loans(Net)": "99.6",
    "Retail Loans (Gross)": "18.7",
    "Corporate & other Loans": "97.1",
    "Investments (Net)": "52.8",
    Assets: "82.6",
    "Total Deposits": "33.2",
    "Demand Deposits": "21.9",
    "TS Deposits": "45.8",
    LCs: "61.9",
    LGs: "34.1",
    "Total Trade Finance": "81.3",
    "Gross Yield": "51.2",
  },
  {
    id: 13,
    year: 2012,
    "Total Loans(Net)": "30.5",
    "Retail Loans (Gross)": "54.7",
    "Corporate & other Loans": "80.3",
    "Investments (Net)": "21.6",
    Assets: "11.2",
    "Total Deposits": "67.9",
    "Demand Deposits": "33.8",
    "TS Deposits": "71.6",
    LCs: "39.7",
    LGs: "11.5",
    "Total Trade Finance": "24.9",
    "Gross Yield": "94.5",
  },
  {
    id: 14,
    year: 2011,
    "Total Loans(Net)": "78.4",
    "Retail Loans (Gross)": "47.2",
    "Corporate & other Loans": "32.9",
    "Investments (Net)": "87.4",
    Assets: "91.8",
    "Total Deposits": "18.3",
    "Demand Deposits": "38.7",
    "TS Deposits": "92.4",
    LCs: "12.1",
    LGs: "75.4",
    "Total Trade Finance": "48.5",
    "Gross Yield": "23.1",
  },
];

const dummyData = [
  {
    id: 1, //for the remaining 13 objects increase this by 1
    year: 2024, //for remaining 13 objects decrease this by 1
    "Total Loans(Net)": "17.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "Retail Loans (Gross)": "17.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "Corporate & other Loans": "17.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "Investments (Net)": "17.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    Assets: "17.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "Total Deposits": "17.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "Demand Deposits": "17.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "TS Deposits": "17.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    LCs: "17.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    LGs: "17.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "Total Trade Finance": "17.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "Gross Yield": "17.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
  },
  {
    //follow above pattern make 13 more objects
  },
];

const categories = [
  {
    name: "Total Loans(Net)",
  },
  {
    name: "Retail Loans (Gross)",
  },
  {
    name: "Corporate and other Loans",
  },
  {
    name: "Investments (Net)",
  },
  {
    name: "Assets",
  },
  {
    name: "Total Deposits",
  },
  {
    name: "Demand Deposits",
  },
  {
    name: "TS Deposits",
  },
  {
    name: "LCs",
  },
  {
    name: "LGs",
  },
  {
    name: "Total Trade Finance",
  },
  {
    name: "Gross Yield",
  },
];

const marketShareByCategory = [
  {
    name: "SAIB",
    value: 11.47,
  },
  {
    name: "Bank Albilad",
    value: 5.63,
  },
  {
    name: "Al-Rajhi Bank",
    value: 6.59,
  },
  {
    name: "Arab National Bank",
    value: 9.71,
  },
  {
    name: "Bank Aljazira",
    value: 14.69,
  },
  {
    name: "Saudi Awwal Bank",
    value: 18.32,
  },
  {
    name: "Saudi National Bank",
    value: 3.65,
  },
  {
    name: "Riyad bank",
    value: 4.52,
  },
  {
    name: "Bank Saudi Fransi",
    value: 3.92,
  },
  {
    name: "Alinma Bank",
    value: 21.5,
  },
];

const banks = [
  {
    name: "SAIB",
    iconUrl: <PiBankBold size={16} />,
  },
  {
    name: "Bank Albilad",
    iconUrl: <PiBankBold size={16} />,
  },
  {
    name: "Saudi Awwal Bank",
    iconUrl: <PiBankBold size={16} />,
  },
  {
    name: "Al-Rajhi Bank",
    iconUrl: <PiBankBold size={16} />,
  },
  {
    name: "Arab National Bank",
    iconUrl: <PiBankBold size={16} />,
  },
  {
    name: "SAB",
    iconUrl: <PiBankBold size={16} />,
  },
  {
    name: "Bank Aljazira",
    iconUrl: <PiBankBold size={16} />,
  },
  {
    name: "Saudi National Bank",
    iconUrl: <PiBankBold size={16} />,
  },
  {
    name: "Riyad bank",
    iconUrl: <PiBankBold size={16} />,
  },
  {
    name: "Bank Saudi Fransi",
    iconUrl: <PiBankBold size={16} />,
  },
];

export { individualBankMarketData, categories, marketShareByCategory, banks };
