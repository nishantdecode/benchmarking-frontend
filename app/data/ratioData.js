const categories = [
  {
    name: "Cost of Income %",
  },
  {
    name: "Cost of Income (adjust..%",
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
    name: "CoF (all deposits) %",
  },
  {
    name: "Profit Margin %(of reven..",
  },
  {
    name: "Costs% (of Revenues)",
  },
  {
    name: "Provisions % (of revenues)",
  },
  {
    name: "Total Expense % (of Reve..",
  },
  {
    name: "Cost of Risk %",
  },
  {
    name: "NPL Coverage %",
  },
];

const bankMultipleRatioData = [
  {
    "year": "2022",
    "SAIB": 12.25,
    "Albilad": 13.43,
    "Saudi Awwal Bank": 24.55
  },
  {
    "year": "2021",
    "SAIB": 7.51,
    "Albilad": 14.86,
    "Saudi Awwal Bank": 20.78
  },
  {
    "year": "2020",
    "SAIB": 19.36,
    "Albilad": 13.68,
    "Saudi Awwal Bank": 17.65
  },
  {
    "year": "2019",
    "SAIB": 23.97,
    "Albilad": 21.98,
    "Saudi Awwal Bank": 27.82
  },
  {
    "year": "2018",
    "SAIB": 32.56,
    "Albilad": 25.39,
    "Saudi Awwal Bank": 37.93
  },
  {
    "year": "2017",
    "SAIB": 29.08,
    "Albilad": 28.85,
    "Saudi Awwal Bank": 32.04
  },
  {
    "year": "2016",
    "SAIB": 35.63,
    "Albilad": 32.29,
    "Saudi Awwal Bank": 40.14
  },
  {
    "year": "2015",
    "SAIB": 41.18,
    "Albilad": 35.73,
    "Saudi Awwal Bank": 45.26
  },
  {
    "year": "2014",
    "SAIB": 48.73,
    "Albilad": 39.18,
    "Saudi Awwal Bank": 54.39
  },
  {
    "year": "2013",
    "SAIB": 43.26,
    "Albilad": 42.64,
    "Saudi Awwal Bank": 48.46
  },
  {
    "year": "2012",
    "SAIB": 57.81,
    "Albilad": 46.09,
    "Saudi Awwal Bank": 62.54
  }
]

const dummyData = [
  {
    id: 1, //for the remaining 13 objects increase this by 1
    year: 2024, //for remaining 13 objects decrease this by 1
    "Cost of Income %": "12.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "Cost of Income % (adju..": "11.4", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "ROA %": "11.8", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "ROE %": "17.4", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "NIM %": "18.7", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "CoF %": "12.5", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "Cost of Risk": "18.2", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "NPL Coverage": "14.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "NPL/ Gross Loans %": "12.9", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "Allowance/ Gross Loans %": "17.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "L/D % (SAMA)": "11.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "Current Accounts/Total..": "17.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "Non-Commission bearin..": "18.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "Time & Savings %": "17.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "NYI %(of Revenues)": "13.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "Fees %(of Revenues)": "18.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "FX %(of Revenues)": "13.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
    "Other Income %(of Reven..": "19.1", //for remaining all 14 objects generate random decimal value between 10.0 and 100.0
  },
  {
    //follow above pattern make 13 more objects
  },
];

const dummyColData = [
  {
    'id': '1',  //increase by 1 in subsequent data objects
    category: 'Cost of Income %', // replace with the categories provided for all categories provided
    '2024': '16.54', //generate random decimal value between 10.0 and 100.0 
    '2023': '13.54', //generate random decimal value between 10.0 and 100.0 
    '2022': '21.46', //generate random decimal value between 10.0 and 100.0 
    '2021': '61.42', //generate random decimal value between 10.0 and 100.0 
    '2020': '61.42', //generate random decimal value between 10.0 and 100.0 
    '2019': '61.43', //generate random decimal value between 10.0 and 100.0 
    '2018': '16.34', //generate random decimal value between 10.0 and 100.0 
    '2017': '61.42', //generate random decimal value between 10.0 and 100.0 
    '2016': '10.47', //generate random decimal value between 10.0 and 100.0 
    '2015': '61.43', //generate random decimal value between 10.0 and 100.0 
    '2014': '11.46', //generate random decimal value between 10.0 and 100.0 
    '2013': '71.34', //generate random decimal value between 10.0 and 100.0 
    '2012': '21.64', //generate random decimal value between 10.0 and 100.0 
    '2011': '81.14', //generate random decimal value between 10.0 and 100.0 
    '2010': '91.43', //generate random decimal value between 10.0 and 100.0 
  },
  {
    'id': '2',
    category: 'Cost of Income % (adjusted)',
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
    category: 'ROA %',
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
  },
  {
    //more data objects for the rest of the categories provided
  }
]

const figuresData = [
  {
    'id': '1',
    category: 'Cost of Income %',
    '2024': '38.65',
    '2023': '76.22',
    '2022': '20.89',
    '2021': '49.13',
    '2020': '86.47',
    '2019': '71.55',
    '2018': '57.24',
    '2017': '66.81',
    '2016': '15.39',
    '2015': '32.77',
    '2014': '79.68',
    '2013': '18.92',
    '2012': '68.36',
    '2011': '43.78',
    '2010': '24.56',
  },
  {
    'id': '2',
    category: 'Cost of Income % (adjusted)',
    '2024': '47.68',
    '2023': '29.14',
    '2022': '85.47',
    '2021': '62.09',
    '2020': '79.84',
    '2019': '18.72',
    '2018': '91.11',
    '2017': '32.69',
    '2016': '56.35',
    '2015': '72.93',
    '2014': '41.25',
    '2013': '87.34',
    '2012': '23.45',
    '2011': '38.71',
    '2010': '67.22',
  },
  {
    'id': '3',
    category: 'ROA %',
    '2024': '62.88',
    '2023': '18.47',
    '2022': '76.32',
    '2021': '43.79',
    '2020': '51.23',
    '2019': '82.34',
    '2018': '37.59',
    '2017': '68.98',
    '2016': '29.18',
    '2015': '19.73',
    '2014': '87.49',
    '2013': '53.88',
    '2012': '78.24',
    '2011': '92.74',
    '2010': '12.55',
  },
  {
    'id': '4',
    category: 'ROE %',
    '2024': '18.32',
    '2023': '71.26',
    '2022': '36.49',
    '2021': '59.84',
    '2020': '82.94',
    '2019': '49.76',
    '2018': '63.92',
    '2017': '29.15',
    '2016': '41.27',
    '2015': '16.68',
    '2014': '83.77',
    '2013': '68.24',
    '2012': '37.81',
    '2011': '92.34',
    '2010': '17.33',
  },
  {
    'id': '5',
    category: 'NIM %',
    '2024': '62.18',
    '2023': '41.87',
    '2022': '78.22',
    '2021': '92.77',
    '2020': '26.14',
    '2019': '53.28',
    '2018': '38.71',
    '2017': '16.28',
    '2016': '71.59',
    '2015': '49.86',
    '2014': '19.39',
    '2013': '81.23',
    '2012': '37.76',
    '2011': '29.12',
    '2010': '62.37',
  },
  {
    'id': '6',
    category: 'CoF %',
    '2024': '32.88',
    '2023': '68.24',
    '2022': '51.83',
    '2021': '82.73',
    '2020': '97.38',
    '2019': '14.92',
    '2018': '79.44',
    '2017': '63.87',
    '2016': '47.29',
    '2015': '29.56',
    '2014': '71.29',
    '2013': '36.82',
    '2012': '82.17',
    '2011': '18.47',
    '2010': '93.27',
  },
  {
    'id': '7',
    category: 'Cost of Risk',
    '2024': '29.37',
    '2023': '67.24',
    '2022': '88.19',
    '2021': '74.38',
    '2020': '21.36',
    '2019': '93.47',
    '2018': '58.23',
    '2017': '31.92',
    '2016': '41.75',
    '2015': '82.36',
    '2014': '17.98',
    '2013': '62.48',
    '2012': '38.12',
    '2011': '52.79',
    '2010': '72.38',
  },
  {
    'id': '8',
    category: 'NPL Coverage',
    '2024': '41.26',
    '2023': '73.12',
    '2022': '18.42',
    '2021': '68.21',
    '2020': '37.19',
    '2019': '91.27',
    '2018': '52.63',
    '2017': '29.16',
    '2016': '47.82',
    '2015': '83.29',
    '2014': '22.49',
    '2013': '64.82',
    '2012': '38.18',
    '2011': '72.39',
    '2010': '29.86',
  },
  {
    'id': '9',
    category: 'NPL/ Gross Loans %',
    '2024': '79.38',
    '2023': '17.27',
    '2022': '38.92',
    '2021': '62.27',
    '2020': '31.77',
    '2019': '92.26',
    '2018': '57.38',
    '2017': '41.38',
    '2016': '76.81',
    '2015': '18.27',
    '2014': '81.26',
    '2013': '29.17',
    '2012': '68.29',
    '2011': '48.82',
    '2010': '22.73',
  },
  {
    'id': '10',
    category: 'Allowance/ Gross Loans %',
    '2024': '28.16',
    '2023': '71.92',
    '2022': '38.82',
    '2021': '91.24',
    '2020': '51.28',
    '2019': '62.18',
    '2018': '41.83',
    '2017': '92.19',
    '2016': '29.63',
    '2015': '38.29',
    '2014': '71.87',
    '2013': '22.67',
    '2012': '81.29',
    '2011': '39.28',
    '2010': '69.16',
  },
  {
    'id': '11',
    category: 'L/D % (SAMA)',
    '2024': '61.29',
    '2023': '32.84',
    '2022': '77.42',
    '2021': '49.17',
    '2020': '28.81',
    '2019': '83.11',
    '2018': '47.32',
    '2017': '62.29',
    '2016': '28.91',
    '2015': '92.47',
    '2014': '68.33',
    '2013': '39.12',
    '2012': '51.29',
    '2011': '79.27',
    '2010': '22.86',
  },
  {
    'id': '12',
    category: 'Current Accounts/Total Accounts',
    '2024': '28.46',
    '2023': '91.29',
    '2022': '49.12',
    '2021': '63.91',
    '2020': '81.19',
    '2019': '37.34',
    '2018': '19.26',
    '2017': '73.29',
    '2016': '28.29',
    '2015': '82.37',
    '2014': '62.29',
    '2013': '31.26',
    '2012': '89.11',
    '2011': '29.26',
    '2010': '49.14',
  },
  {
    'id': '13',
    category: 'Non-Commission bearings',
    '2024': '18.37',
    '2023': '62.94',
    '2022': '28.27',
    '2021': '73.26',
    '2020': '51.29',
    '2019': '38.12',
    '2018': '79.26',
    '2017': '72.19',
    '2016': '41.27',
    '2015': '22.63',
    '2014': '81.37',
    '2013': '91.28',
    '2012': '29.38',
    '2011': '68.21',
    '2010': '51.12',
  },
  {
    'id': '14',
    category: 'Time & Savings %',
    '2024': '62.26',
    '2023': '48.12',
    '2022': '17.28',
    '2021': '73.16',
    '2020': '29.12',
    '2019': '41.27',
    '2018': '82.39',
    '2017': '92.46',
    '2016': '39.23',
    '2015': '68.21',
    '2014': '22.79',
    '2013': '51.19',
    '2012': '89.21',
    '2011': '31.26',
    '2010': '79.24',
  },
  {
    'id': '15',
    category: 'NYI %(of Revenues)',
    '2024': '82.29',
    '2023': '71.26',
    '2022': '31.79',
    '2021': '48.12',
    '2020': '62.27',
    '2019': '39.23',
    '2018': '18.27',
    '2017': '62.24',
    '2016': '29.39',
    '2015': '83.28',
    '2014': '49.18',
    '2013': '68.22',
    '2012': '21.36',
    '2011': '91.29',
    '2010': '41.24',
  },
  {
    'id': '16',
    category: 'Fees %(of Revenues)',
    '2024': '31.28',
    '2023': '68.31',
    '2022': '83.12',
    '2021': '22.27',
    '2020': '72.39',
    '2019': '61.26',
    '2018': '41.37',
    '2017': '29.13',
    '2016': '79.16',
    '2015': '51.29',
    '2014': '17.24',
    '2013': '62.37',
    '2012': '92.38',
    '2011': '38.12',
    '2010': '79.26',
  },
  {
    'id': '17',
    category: 'FX %(of Revenues)',
    '2024': '68.21',
    '2023': '39.24',
    '2022': '29.16',
    '2021': '51.29',
    '2020': '17.36',
    '2019': '92.37',
    '2018': '41.28',
    '2017': '79.26',
    '2016': '22.29',
    '2015': '62.26',
    '2014': '91.26',
    '2013': '38.27',
    '2012': '61.19',
    '2011': '29.16',
    '2010': '83.21',
  },
  {
    'id': '18',
    category: 'Other Income %(of Revenues)',
    '2024': '49.28',
    '2023': '18.29',
    '2022': '79.21',
    '2021': '31.27',
    '2020': '92.38',
    '2019': '41.26',
    '2018': '22.27',
    '2017': '68.29',
    '2016': '51.28',
    '2015': '39.14',
    '2014': '79.12',
    '2013': '29.24',
    '2012': '83.26',
    '2011': '62.27',
    '2010': '17.28',
  },
];





export { categories, bankMultipleRatioData, figuresData };
