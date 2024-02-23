"use client";

const bankCol = ({ key, data }) => {
  return {
    accessorKey: "category",
    header: (
      <div key={key} className="text-center font-bold min-w-[150px]">
        {" "}
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div key={key} className="text-left font-medium">
          {row.getValue(key)}
        </div>
      );
    },
  };
};

const yearCol = ({ key, data }) => {
  return {
    accessorKey: key,
    header: ({ column }) => {
      return (
        <div
          key={key}
          className="flex flex-row justify-center font-bold min-w-[150px] gap-2"
        >
          {key}
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div key={key} className="text-center font-medium">
          {row.getValue(key)}
        </div>
      );
    },
  };
};

export const generateColumns = (data) => {
    console.log(data)
  return Object.keys(data[0])
    .filter((key) => key !== "id")
    .reverse()
    .map((accessorKey) => {
      if (accessorKey === "category") {
        return bankCol({ key: accessorKey, data });
      } else {
        return yearCol({ key: accessorKey, data });
      }
    });
};
