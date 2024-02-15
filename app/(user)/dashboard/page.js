"use client";

import CompetitionCards from "@/components/dashboard/competitionCards";
import CompetitionHeader from "@/components/dashboard/competitionHeader";
import SelectBank from "@/components/dashboard/selectBank";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { PiBankBold } from "react-icons/pi";

const rankingData = [
  {
    name: "Income before Provisions",
    highest: {
      name: "SAIB",
      value: "821245860.00",
    },
    lowest: {
      name: "Bank Albilad",
      value: "821245860.00",
    },
  },
  {
    name: "NIM %",
    highest: {
      name: "SAB",
      value: "8.2 %",
    },
    lowest: {
      name: "Al Rajhi Bank",
      value: "1.2 %",
    },
  },
  {
    name: "Cost of Risk",
    highest: {
      name: "Arab National Bank",
      value: "4.22 %",
    },
    lowest: {
      name: "SAB",
      value: "0.12 %",
    },
  },
  {
    name: "Operating Income/Expense",
    highest: {
      name: "SAIB",
      value: "1625300.54",
    },
    lowest: {
      name: "Bank Albilad",
      value: "1625300.54",
    },
  },
  {
    name: "Total Investment",
    highest: {
      name: "SAB",
      value: "821245860.00",
    },
    lowest: {
      name: "SAIB",
      value: "821245860.00",
    },
  },
  {
    name: "Cost of Income",
    highest: {
      name: "SAIB",
      value: "821245860.00",
    },
    lowest: {
      name: "Bank Albilad",
      value: "821245860.00",
    },
  },
];

const bankData = [
  {
    name: 'SAIB',
    icon: <PiBankBold size={20}/>
  },
  {
    name: 'Bank Albilad',
    icon: <PiBankBold size={20}/>
  },
  {
    name: 'Saudi Awwal Bank',
    icon: <PiBankBold size={20}/>
  },
  {
    name: 'Al Rajhi Bank',
    icon: <PiBankBold size={20}/>
  },
  {
    name: 'Arab National Bank',
    icon: <PiBankBold size={20}/>
  },
  {
    name: 'SAB',
    icon: <PiBankBold size={20}/>
  },
  {
    name: 'Al Jazira Bank',
    icon: <PiBankBold size={20}/>
  },
  {
    name: 'SAIB',
    icon: <PiBankBold size={20}/>
  }
]

const trendData = [
  {
    name: 'SAIB',
    icon: <PiBankBold size={20}/>
  },
  {
    name: 'Bank Albilad',
    icon: <PiBankBold size={20}/>
  },
  {
    name: 'Saudi Awwal Bank',
    icon: <PiBankBold size={20}/>
  },
  {
    name: 'Al Rajhi Bank',
    icon: <PiBankBold size={20}/>
  },
  {
    name: 'Arab National Bank',
    icon: <PiBankBold size={20}/>
  },
  {
    name: 'SAB',
    icon: <PiBankBold size={20}/>
  },
  {
    name: 'Al Jazira Bank',
    icon: <PiBankBold size={20}/>
  },
  {
    name: 'SAIB',
    icon: <PiBankBold size={20}/>
  }
]

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-full p-5 pl-10 gap-10">
      <div className="flex flex-col justify-start items-start w-full h-auto gap-3">
        <CompetitionHeader />
        <CompetitionCards data={rankingData} />
      </div>
      <SelectBank data={bankData}/>
      <div className="grid grid-cols-2 gap-4 w-full h-full">
        {rankingData.map((item, index)=> {
          return (
            <Card key={index} className="p-5">
              <CardHeader className="flex flex-row justify-between">
                <CardTitle className="mt-2">{item.name}</CardTitle>
                <Button variant="outline" className="p-2">View More</Button>
              </CardHeader>
            </Card>
          )
        })}
      </div>
    </div>
  );
};

export default Dashboard;
