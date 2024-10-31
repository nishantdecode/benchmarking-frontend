"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { Cloudinary } from "@cloudinary/url-gen";
import { useRouter } from "next/navigation";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";

import { BiEdit } from "react-icons/bi";
import { MdFindInPage } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { PiBankBold } from "react-icons/pi";
import { useRequestExtractionMutation } from "@/lib/features/services/bankApi";
import showToast from "@/util/showToast";

export function VisualiseTable({ data, columnName, role, search, title }) {
  const bankColumns = [
    {
      accessorKey: "name",
      header: () => {
        return <div className="w-auto text-center font-bold">Bank Name</div>;
      },
      cell: ({ row }) => {
        const cld = new Cloudinary({
          cloud: {
            cloudName: "dohnlambm",
          },
        });
        const myImage = cld.image(row.original.iconUrl);
        return (
          <div className="flex flex-row w-auto gap-4 text-left font-medium">
            <div
              className="max-h-5 min-h-5 max-w-5 min-w-5 mt-1.5"
              style={{ backgroundColor: row.original.color }}
            ></div>
            <div className="flex flex-row justify-center items-center min-h-6 min-w-6 rounded-full bg-secondary dark:bg-white">
              {myImage ? (
                <AdvancedImage
                  className="w-8 h-8 object-cover rounded-full bg-white"
                  cldImg={myImage}
                  plugins={[responsive(), placeholder()]}
                />
              ) : (
                <div className="flex justify-center items-center h-10 w-10 bg-foreground rounded-full">
                  <PiBankBold size={10} className="text-secondary" />
                </div>
              )}
            </div>
            <span className="mt-2 text-xs truncate text-ellipsis">
              {row.getValue("name")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "headquarters",
      header: () => {
        return (
          <div className="flex flex-row justify-center w-auto gap-2 truncate text-ellipsis font-semibold">
            Headquarters
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("headquarters")}
          </div>
        );
      },
    },
    {
      id: "extract",
      header: () => {
        return (
          <div className="flex flex-row justify-center w-auto gap-2 truncate text-ellipsis font-semibold">
            Status
          </div>
        );
      },
      cell: ({ row }) => {
        const bank = row.original;
        const requestExtract = async ({ bank, user }) => {
          try {
            const response = await requestExtraction({ id: bank.id, user });
            console.log({ response });
            if (response.error) {
              setLoading({ bank: bank.name, isLoading: false });

              showToast("Server Error", response.error.data.message);

            }
            if (response.data) {
              window.location.href = process.env.NEXT_PUBLIC_ENV === "DEV" ? "http://localhost:3000/dashboard/admin" :
                "https://benchmarking-frontend.vercel.app/dashboard/admin";
            }
          } catch (err) {
            console.log(err);
            showToast("Error!", "Please try again later.");
          }
        };
        return (
          <div className="flex flex-row justify-center items-center w-auto text-center font-medium">
            {bank?.extraction?.disabled ? (
              <Button
                size="sm"
                variant="toggleActive"
                className="flex flex-row w-auto gap-2 px-10 text-xs rounded-xl"
              >
                <MdFindInPage size={15} />
                {bank?.extraction?.status}
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="flex flex-row w-auto gap-2 px-10 text-xs rounded-xl"
                onClick={() => {
                  setLoading({ bank: bank.name, isLoading: true });
                  requestExtract({ bank: bank, user: userObj });
                }}
              >
                {loading?.bank?.toString() === bank?.name?.toString() &&
                loading?.isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MdFindInPage size={15} />
                )}
                Request Extraction
              </Button>
            )}
          </div>
        );
      },
    },
    {
      id: "edit",
      header: () => {
        return (
          <div className="flex flex-row justify-center w-auto gap-2 truncate text-ellipsis font-semibold"></div>
        );
      },
      cell: ({ row }) => {
        const bank = row.original;
        return (
          <div className="w-auto text-center font-medium">
            <Button
              size="sm"
              variant="link"
              className="flex flex-row w-auto text-xs rounded-sm"
            >
              <Link
                href={`/dashboard/admin/bank?action=edit&bankId=${bank.id}`}
              >
                <BiEdit size={15} />
              </Link>
            </Button>
          </div>
        );
      },
    },
  ];

  const bankViewColumns = [
    {
      accessorKey: "name",
      header: () => {
        return <div className="w-auto text-center font-bold">Bank Name</div>;
      },
      cell: ({ row }) => {
        const cld = new Cloudinary({
          cloud: {
            cloudName: "dohnlambm",
          },
        });
        const myImage = cld.image(row.original.iconUrl);
        return (
          <div className="flex flex-row w-auto gap-4 text-left font-medium">
            <div
              className="max-h-5 min-h-5 max-w-5 min-w-5 mt-1.5"
              style={{ backgroundColor: row.original.color }}
            ></div>
            <div className="flex flex-row justify-center items-center min-h-6 min-w-6 rounded-full bg-secondary dark:bg-white">
              {myImage ? (
                <AdvancedImage
                  className="w-8 h-8 object-cover rounded-full bg-white"
                  cldImg={myImage}
                  plugins={[responsive(), placeholder()]}
                />
              ) : (
                <div className="flex justify-center items-center h-10 w-10 bg-foreground rounded-full">
                  <PiBankBold size={10} className="text-secondary" />
                </div>
              )}
            </div>
            <span className="mt-2 text-xs truncate text-ellipsis">
              {row.getValue("name")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "headquarters",
      header: () => {
        return (
          <div className="flex flex-row justify-center w-auto gap-2 truncate text-ellipsis font-semibold">
            Headquarters
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("headquarters")}
          </div>
        );
      },
    },
  ];

  const userColumns = [
    {
      accessorKey: "name",
      header: () => {
        return <div className="w-auto text-center font-bold">User Name</div>;
      },
      cell: ({ row }) => {
        const cld = new Cloudinary({
          cloud: {
            cloudName: "dohnlambm",
          },
        });
        const myImage = cld.image(row.original.picture);
        return (
          <div className="flex flex-row w-auto gap-4 text-left font-medium">
            <div className="flex flex-row justify-center items-center min-h-6 min-w-6 rounded-full bg-secondary dark:bg-white">
              {myImage ? (
                <AdvancedImage
                  className="w-8 h-8 object-cover rounded-full bg-white"
                  cldImg={myImage}
                  plugins={[responsive(), placeholder()]}
                />
              ) : (
                <div className="flex justify-center items-center h-10 w-10 bg-foreground rounded-full">
                  <RxAvatar size={10} className="text-secondary" />
                </div>
              )}
            </div>
            <span className="mt-2 text-xs truncate text-ellipsis">
              {row.getValue("name").first} {row.getValue("name").last}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => {
        return (
          <div className="flex flex-row justify-center w-auto gap-2 truncate text-ellipsis font-semibold">
            Email ID
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">{row.getValue("email")}</div>
        );
      },
    },
    {
      accessorKey: "organisation",
      header: () => {
        return (
          <div className="flex flex-row justify-center w-auto gap-2 truncate text-ellipsis font-semibold">
            Organisation
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("organisation")}
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: () => {
        return (
          <div className="flex flex-row justify-center w-auto gap-2 truncate text-ellipsis font-semibold">
            Profile
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("role")?.name}
          </div>
        );
      },
    },
    {
      id: "edit",
      header: () => {
        return (
          <div className="flex flex-row justify-center w-auto gap-2 truncate text-ellipsis font-semibold"></div>
        );
      },
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="text-center font-medium">
            <Button
              size="sm"
              variant="link"
              className="flex flex-row text-xs rounded-sm"
            >
              <Link
                href={`/dashboard/admin/user?action=edit&userId=${user.id}`}
              >
                <BiEdit size={15} />
              </Link>
            </Button>
          </div>
        );
      },
    },
  ];

  const organisationColumns = [
    {
      accessorKey: "name",
      header: () => {
        return <div className="w-auto text-center font-bold">Name</div>;
      },
      cell: ({ row }) => {
        const cld = new Cloudinary({
          cloud: {
            cloudName: "dohnlambm",
          },
        });
        const myImage = cld.image(row.original.picture);
        return (
          <div className="flex flex-row w-auto gap-4 text-left font-medium">
            <div className="flex flex-row justify-center items-center min-h-6 min-w-6 rounded-full bg-secondary dark:bg-white">
              {myImage ? (
                <AdvancedImage
                  className="w-8 h-8 object-cover rounded-full bg-white"
                  cldImg={myImage}
                  plugins={[responsive(), placeholder()]}
                />
              ) : (
                <div className="flex justify-center items-center h-10 w-10 bg-foreground rounded-full">
                  <RxAvatar size={10} className="text-secondary" />
                </div>
              )}
            </div>
            <span className="mt-2 text-xs truncate text-ellipsis">
              {row.getValue("name")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "headquarter",
      header: () => {
        return (
          <div className="flex flex-row justify-center w-auto gap-2 truncate text-ellipsis font-semibold">
            Headquarter
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("headquarter")}
          </div>
        );
      },
    },
    {
      accessorKey: "contact",
      header: () => {
        return (
          <div className="flex flex-row justify-center w-auto gap-2 truncate text-ellipsis font-semibold">
            Contact
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("contact")}
          </div>
        );
      },
    },
    {
      id: "edit",
      header: () => {
        return (
          <div className="flex flex-row justify-center w-auto gap-2 truncate text-ellipsis font-semibold"></div>
        );
      },
      cell: ({ row }) => {
        const organisation = row.original;
        return (
          <div className="text-center font-medium">
            <Button
              size="sm"
              variant="link"
              className="flex flex-row text-xs rounded-sm"
            >
              <Link
                href={`/dashboard/admin/organisation?action=edit&organisationId=${organisation.id}`}
              >
                <BiEdit size={15} />
              </Link>
            </Button>
          </div>
        );
      },
    },
  ];
  const router = useRouter();
  const category = title;
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);

  const [loading, setLoading] = useState({
    bank: null,
    isLoading: false,
  });
  const [requestExtraction] = useRequestExtractionMutation();
  const userObj = useSelector((state) => state.auth.user) || null;

  let columns = null;
  if (columnName === "bankColumns" && role === "SuperAdmin")
    columns = bankColumns;
  else if (
    columnName === "bankColumns" &&
    (role === "Admin" || role === "User")
  )
    columns = bankViewColumns;
  else if (columnName === "organisationColumns" && role === "SuperAdmin")
    columns = organisationColumns;
  else if (columnName === "userColumns") columns = userColumns;

  const table = useReactTable({
    data: data ? data : [],
    columns: columns ? columns : [],
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row w-full justify-between items-center gap-4">
        {title && (
          <div className="flex justify-center lg:justify-start w-full">
            {title}
          </div>
        )}
        <div className="flex flex-col lg:flex-row w-full justify-between items-center lg:justify-end gap-4">
          {title === "Users" ? (
            data &&
            search && (
              <div className="flex flex-col sm:flex-row items-center justify-end w-full sm:w-auto gap-2">
                <Input
                  placeholder="Filter data by email..."
                  value={table?.getColumn("email")?.getFilterValue() ?? ""}
                  onChange={(event) =>
                    table
                      ?.getColumn("email")
                      ?.setFilterValue(event.target.value)
                  }
                />
              </div>
            )
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-end w-full sm:w-auto gap-2">
              <Input
                placeholder="Filter data by name..."
                value={table?.getColumn("name")?.getFilterValue() ?? ""}
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
              />
            </div>
          )}
          {role === "SuperAdmin" ? (
            <div className="flex flex-row w-auto gap-1">
              <Button
                variant="default"
                className="flex py-0 text-xs justify-center w-auto"
                onClick={() =>
                  category === "Banks"
                    ? router.push("/dashboard/admin/bank?action=add")
                    : category === "Organisations"
                    ? router.push("/dashboard/admin/organisation?action=add")
                    : router.push("/dashboard/admin/user?action=add")
                }
              >
                {category === "Banks"
                  ? "Add Bank"
                  : category === "Organisations"
                  ? "Add Organisation"
                  : "Add User"}
              </Button>
            </div>
          ) : role === "Admin" && category === "Users" ? (
            <div className="flex flex-row w-auto gap-1">
              <Button
                variant="default"
                className="flex py-0 text-xs justify-center w-auto"
                onClick={() => router.push("/dashboard/admin/user?action=add")}
              >
                {"Add User"}
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="max-h-[500px] sm:max-h-[700px] w-full overflow-scroll rounded-md border">
        <Table>
          {data.length !== 0 && (
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={`${index === 0 ? "border-r-[1px]" : ""}`}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
          )}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={`${
                        index === 0 ? "bg-secondary border-r-[1px]" : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No Data!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
