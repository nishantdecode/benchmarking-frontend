"use client";

import { Progress } from "@/components/ui/progress";
import { banks } from "@/app/data/data";

const initialCol = ({ key }) => {
  return {
    accessorKey: key,
    header: () => {
      return <div className="w-[120px] text-center font-bold"> </div>;
    },
    cell: ({ row }) => {
      return (
        <div className="w-[120px] text-left font-medium truncate text-ellipsis">
          {row.getValue(key)}
        </div>
      );
    },
  };
};

const initialBankCol = ({ key }) => {
  return {
    accessorKey: key,
    header: () => {
      return <div className="w-[120px] text-center font-bold"> </div>;
    },
    cell: ({ row }) => {
      const icon = banks.find((item) => item.name === row.getValue(key))?.iconUrl;
      return (
        <div className="flex flex-row w-[120px] gap-2 text-left font-medium">
          <div className="flex flex-row justify-center items-center min-h-6 min-w-6 rounded-full bg-secondary dark:bg-white">
            <img src={icon} className="h-4 w-4"></img>
          </div>
          <span className="mt-1 text-xs truncate text-ellipsis">
            {row.getValue(key)}
          </span>
        </div>
      );
    },
  };
};

const initialRankCol = ({ key }) => {
  return {
    accessorKey: "rank",
    header: <div key={key} className="text-center font-bold min-w-[150px]"> </div>,
    cell: ({ row }) => {
      return <div key={key} className="text-left font-medium">{row.getValue(key) === '1' ? "1st Rank" : row.getValue(key) === '2' ? "2nd Rank" : row.getValue(key) === '3' ? "3rd Rank" : `${row.getValue(key)}th Rank`}</div>;
    },
  };
};

const remainingCol = ({ key }) => {
  return {
    accessorKey: key,
    header: ({ column }) => {
      return (
        <div className="flex flex-row justify-center w-[150px] gap-2 truncate text-ellipsis font-semibold">
          {key}
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue(key)}</div>;
    },
  };
};

const progressCol = ({ key, color }) => {
  return {
    accessorKey: key,
    header: ({ column }) => {
      return (
        <div className="flex flex-row justify-start w-[150px] gap-2 truncate text-ellipsis font-semibold">
          {key}
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-row w-full">
          <Progress value={row.getValue(key)} bg={color}>
            {row.getValue(key)}
          </Progress>
        </div>
      );
    },
  };
};

const itemRankCol = ({ key, colors }) => {
  return {
    accessorKey: key,
    header: ({ column }) => {
      return (
        <div className="flex flex-row justify-center font-bold min-w-[150px] gap-2">
          {key}
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-5 justify-center">
          <div className="text-center font-medium">
            {row.getValue(key).value}
          </div>
          <div
            className="flex flex-row justify-center items-center h-6 w-6 rounded-full"
            style={{
              backgroundColor: banks.find(
                (item) =>
                  row.getAllCells(key)[0].row.original.bank.toString() ===
                  item.name.toString()
              )?.color,
            }}
          >
            {row.getValue(key).rank}
          </div>
        </div>
      );
    },
  };
};

const rankCol = ({ key }) => {
  return {
    accessorKey: key,
    header: () => {
      return (
        <div className="flex flex-row justify-center font-bold min-w-[150px] gap-2">
          {key}
        </div>
      );
    },
    cell: ({ row }) => {
      const icon = banks.find((item) => item.name === row.getValue(key))?.iconUrl;
      return (
        <div className="flex flex-row w-[120px] pl-2 gap-2 text-left font-medium">
          <div className="flex flex-row justify-center items-center min-h-6 min-w-6 rounded-full bg-secondary dark:bg-white">
            <img src={icon} className="h-4 w-4"></img>
          </div>
          <span className="mt-1 text-xs truncate text-ellipsis">
            {row.getValue(key)}
          </span>
        </div>
      );
    },
  };
};

const msCol = ({ key, colors }) => {
  return {
    accessorKey: key,
    header: ({ column }) => {
      return (
        <div className="flex flex-row justify-between pl-2 pr-6 font-bold min-w-[200px] gap-2">
          {key}
          <div>Market Share</div>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-5 justify-center">
          <div className="text-center font-medium">
            {row.getValue(key).value}
          </div>
          <Progress
            value={row.getValue(key).share}
            className="w-[150px]"
            bg={
              banks.find(
                (item) =>
                  row.getAllCells(key)[0].row.original.bank?.toString() ===
                  item.name.toString()
              )?.color
            }
          >
            {row.getValue(key).share}
          </Progress>
        </div>
      );
    },
  };
};

export const generateColumns = ({ data, initialType, type, color }) => {
  let array = Object.keys(data[0]);

  if (array[0] !== "id") {
    array = array.reverse();
  }

  return array
    .filter((key) => key !== "id")
    .map((accessorKey, index) => {
      if (index === 0 && initialType === "bank") {
        return initialBankCol({ key: accessorKey });
      } else if (index === 0 && initialType === "initialRank") {
        return initialRankCol({ key: accessorKey });
      } else if (index === 0) {
        return initialCol({ key: accessorKey });
      } else if (type === "progress") {
        return progressCol({ key: accessorKey, color });
      } else if (type === "itemRank") {
        return itemRankCol({ key: accessorKey });
      } else if (type === "ms") {
        return msCol({ key: accessorKey });
      } else if (type === "rank") {
        return rankCol({ key: accessorKey });
      } else {
        return remainingCol({ key: accessorKey });
      }
    });
};
