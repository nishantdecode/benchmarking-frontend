"use client";

import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

import { PiBankBold } from "react-icons/pi";

import { Progress } from "@/components/ui/progress";

const initialCol = ({ key }) => {
  return {
    accessorKey: key,
    header: () => {
      return <div className="w-[180px] text-center font-bold"> </div>;
    },
    cell: ({ row }) => {
      return (
        <div className="w-[180px] text-left font-medium truncate text-ellipsis">
          {row.getValue(key)}
        </div>
      );
    },
  };
};

const initialBankCol = ({ key, banks }) => {
  return {
    accessorKey: key,
    header: () => {
      return <div className="w-[180px] text-center font-bold"> </div>;
    },
    cell: ({ row }) => {
      const bank = banks?.find((item) => item.id === row.getValue(key));
      const cld = new Cloudinary({
        cloud: {
          cloudName: "dohnlambm",
        },
      });
      const myImage = cld.image(bank?.iconUrl);
      return (
        <div className="flex flex-row w-[180px] gap-2 text-left font-medium">
          <div className="flex flex-row justify-center items-center min-h-6 min-w-6 rounded-full bg-secondary dark:bg-white">
            {myImage ? (
              <AdvancedImage
                className="w-6 h-6 object-cover rounded-full bg-white"
                cldImg={myImage}
                plugins={[responsive(), placeholder()]}
              />
            ) : (
              <div className="flex justify-center items-center h-8 w-8 bg-foreground rounded-full">
                <PiBankBold size={10} className="text-secondary" />
              </div>
            )}
          </div>
          <span className="mt-1 text-xs truncate text-ellipsis">
            {bank?.name}
          </span>
        </div>
      );
    },
  };
};

const initialRankCol = ({ key }) => {
  return {
    accessorKey: key,
    header: (
      <div key={key} className="w-[180px] text-center font-bold">
        {" "}
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div key={key} className="w-[180px] text-left font-medium">
          {row.getValue(key).toString() === "1"
            ? "1st Rank"
            : row.getValue(key).toString() === "2"
            ? "2nd Rank"
            : row.getValue(key).toString() === "3"
            ? "3rd Rank"
            : `${row.getValue(key)}th Rank`}
        </div>
      );
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
            {row.getValue(key)?.toFixed(4) + "%"}
          </Progress>
        </div>
      );
    },
  };
};

const progressBankCol = ({ key, banks }) => {
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
      const color = banks?.find(
        (item) => item.name.toString() === key.toString()
      ).color;
      return (
        <div className="flex flex-row w-full">
          <Progress value={row.getValue(key)} bg={color}>
            {row.getValue(key) || "0.0000" + "%"}
          </Progress>
        </div>
      );
    },
  };
};

const itemRankCol = ({ key, banks }) => {
  return {
    accessorKey: key,
    header: ({ column }) => {
      return (
        <div className="flex flex-row justify-center font-bold min-w-[190px] gap-2">
          {key}
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-row justify-between px-8">
          <div className="text-center font-medium">
            {row.getValue(key).value}
          </div>
          <div
            className="flex flex-row justify-center items-center h-6 w-6 rounded-full font-bold text-white"
            style={{
              backgroundColor: banks?.find(
                (item) =>
                  row.getAllCells(key)[0].row.original.bankId?.toString() ===
                  item.id.toString()
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

const rankCol = ({ key, banks }) => {
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
      const bank = banks?.find((item) => item.name === row.getValue(key));
      const cld = new Cloudinary({
        cloud: {
          cloudName: "dohnlambm",
        },
      });
      const myImage = cld.image(bank?.iconUrl);
      return (
        <div className="flex flex-row w-[120px] pl-2 gap-2 text-left font-medium">
          <div className="flex flex-row justify-center items-center min-h-6 min-w-6 rounded-full bg-secondary dark:bg-white">
            {myImage ? (
              <AdvancedImage
                className="w-6 h-6 object-cover rounded-full bg-white"
                cldImg={myImage}
                plugins={[responsive(), placeholder()]}
              />
            ) : (
              <div className="flex justify-center items-center h-8 w-8 bg-foreground rounded-full">
                <PiBankBold size={10} className="text-secondary" />
              </div>
            )}
          </div>
          <span className="mt-1 text-xs truncate text-ellipsis">
            {row.getValue(key)}
          </span>
        </div>
      );
    },
  };
};

const msCol = ({ key, banks }) => {
  return {
    accessorKey: key,
    header: ({ column }) => {
      return (
        <div className="flex flex-row justify-between pl-2 pr-6 font-bold min-w-[240px] gap-2">
          {key}
          <div>Market Share</div>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-row justify-between px-2">
          <div className="text-center font-medium">
            {row.getValue(key).value}
          </div>
          <Progress
            value={row.getValue(key).share}
            className="w-[120px]"
            bg={
              banks?.find(
                (item) =>
                  row.getAllCells(key)[0].row.original.bankId?.toString() ===
                  item.id.toString()
              )?.color
            }
          >
            {row.getValue(key).share + "%"}
          </Progress>
        </div>
      );
    },
  };
};

export const generateColumns = ({ data, initialType, type, color, banks }) => {
  let array = Object.keys(data[0]);

  if (array[0] !== "id") {
    array = array.reverse();
  }

  return array
    .filter((key) => key !== "id")
    .map((accessorKey, index) => {
      if (index === 0 && initialType === "bank") {
        return initialBankCol({ key: accessorKey, banks });
      } else if (index === 0 && initialType === "initialRank") {
        return initialRankCol({ key: accessorKey });
      } else if (index === 0) {
        return initialCol({ key: accessorKey });
      } else if (type === "progress") {
        return progressCol({ key: accessorKey, color, banks });
      } else if (type === "progressBank") {
        return progressBankCol({ key: accessorKey, banks });
      } else if (type === "itemRank") {
        return itemRankCol({ key: accessorKey, banks });
      } else if (type === "ms") {
        return msCol({ key: accessorKey, banks });
      } else if (type === "rank") {
        return rankCol({ key: accessorKey, banks });
      } else {
        return remainingCol({ key: accessorKey });
      }
    });
};
