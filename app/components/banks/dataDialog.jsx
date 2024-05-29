import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaAngleDown } from "react-icons/fa";
import {
  useExportDataMutation,
  useImportDataMutation,
} from "@/lib/features/services/individualBankApi";
import showToast from "@/util/showToast";
import { MdClose } from "react-icons/md";

const intervals = ["Annual", "Quarter 1", "Quarter 2", "Quarter 3"];

const currentYear = new Date().getFullYear();
const startYear = 2011;
const years = [];

for (let year = startYear; year <= currentYear; year++) {
  years.push(year);
}

export function DataDialog({ banks }) {
  const [getSheet] = useExportDataMutation();
  const [uplaodSheet, { isLoading }] = useImportDataMutation();

  const [year, setYear] = useState(years[0]);
  const [bank, setBank] = useState(banks[0].name);
  const [interval, setInterval] = useState(intervals[0]);

  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles) {
      setFile({
        doc: acceptedFiles[0],
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
    }
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: "text/csv",
    });

  async function handleUpload(e) {
    e.preventDefault();

    if (typeof acceptedFiles[0] === "undefined") return;

    const formData = new FormData();

    formData.append("file", acceptedFiles[0], acceptedFiles[0].name);

    try {
      const bankId = banks.find((item) => item.name === bank).id;
      let quarter = null;
      switch (interval) {
        case "Quarter 1":
          quarter = 1;
          break;
        case "Quarter 2":
          quarter = 2;
          break;
        case "Quarter 3":
          quarter = 3;
          break;
        default:
          break;
      }

      const response = await uplaodSheet({ bankId, quarter, formData });

      if (response.data) {
        showToast("Upload Successful!", undefined);
      }
    } catch (err) {
      showToast("Error!", "Upload Failed!");
    }
  }

  async function handleDownload() {
    try {
      const bankId = banks.find((item) => item.name === bank).id;
      let quarter = null;
      switch (interval) {
        case "Quarter 1":
          quarter = 1;
          break;
        case "Quarter 2":
          quarter = 2;
          break;
        case "Quarter 3":
          quarter = 3;
          break;
        default:
          break;
      }
      const response = await getSheet({ bankId, year, quarter });

      const csv = response.data.result.csv;
      const blob = new Blob([csv], { type: "text/csv" });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.setAttribute(
        "download",
        `${
          bank + "_"  + (quarter ? "QUARTER_"+ quarter : "ANNUAL")
        }.csv`
      );
      document.body.appendChild(link);

      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      showToast("Error!", "Download Failed!");
    }
  }

  return (
    <DialogContent className="w-full px-5 py-8">
      <DialogHeader className="gap-5">
        <DialogTitle className="flex justify-center w-full text-lg lg:text-2xl">
          Add Data
        </DialogTitle>
        <DialogDescription>
          <div className="flex flex-col justify-center items-center py-3 gap-5">
            <div className="flex flex-col sm:flex-row justify-between w-full gap-2 text-foreground">
              <div className="w-auto sm:w-[120px] mt-3 text-xs">
                Select Bank :
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="input"
                    className="flex justify-between w-full md:max-w-[300px] gap-2 rounded-md"
                  >
                    <div>{bank}</div>
                    <FaAngleDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60">
                  <DropdownMenuRadioGroup
                    value={bank}
                    onValueChange={(v) => {
                      setBank(v);
                    }}
                  >
                    {banks.map((bank, index) => {
                      return (
                        <DropdownMenuRadioItem
                          key={index}
                          value={bank.name}
                          className="flex flex-row justify-start w-full px-5"
                        >
                          {bank.name}
                        </DropdownMenuRadioItem>
                      );
                    })}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex flex-col sm:flex-row justify-between w-full gap-2 text-foreground">
              <div className="w-auto sm:w-[120px] mt-3 text-xs">
                Select Interval :
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="input"
                    className="flex justify-between w-full md:max-w-[300px] gap-2 rounded-md"
                  >
                    <div>{interval}</div>
                    <FaAngleDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60">
                  <DropdownMenuRadioGroup
                    value={interval}
                    onValueChange={(v) => {
                      setInterval(v);
                    }}
                  >
                    {intervals.map((item, index) => {
                      return (
                        <DropdownMenuRadioItem
                          key={index}
                          value={item}
                          className="flex flex-row justify-start w-full px-5"
                        >
                          {item}
                        </DropdownMenuRadioItem>
                      );
                    })}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="hidden justify-between w-full gap-2 text-foreground">
              <div className="w-auto sm:w-[120px] mt-3 text-xs">
                Select Year :
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="input"
                    className="flex justify-between w-full md:max-w-[300px] gap-2 rounded-md"
                  >
                    <div>{year}</div>
                    <FaAngleDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60">
                  <DropdownMenuRadioGroup
                    value={year}
                    onValueChange={(v) => {
                      setYear(v);
                    }}
                  >
                    {years.map((item, index) => {
                      return (
                        <DropdownMenuRadioItem
                          key={index}
                          value={item}
                          className="flex flex-row justify-start w-full px-5"
                        >
                          {item}
                        </DropdownMenuRadioItem>
                      );
                    })}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex flex-col justify-center items-center w-full mt-5 gap-2 text-foreground">
              {file ? (
                <div className="flex flex-row justify-center items-center w-full p-5 gap-3 rounded-md border border-toggle text-foreground cursor-pointer">
                  <div>{file?.doc?.name}</div>
                  <MdClose
                    className="mt-1 hover:text-primary"
                    onClick={() => setFile(null)}
                  />
                </div>
              ) : (
                <div
                  {...getRootProps({
                    className:
                      "flex justify-center w-full p-5 rounded-md border border-toggle cursor-pointer",
                  })}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the sheet here ...</p>
                  ) : (
                    <p>Drag n drop or click to upload sheet</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="flex flex-row justify-between sm:justify-between w-full">
        <DialogClose asChild>
          <Button
            className="text-xs"
            onClick={() => {
              handleDownload();
            }}
          >
            Get Sample Sheet
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            variant="secondary"
            className="text-xs gap-2"
            onClick={(e) => handleUpload(e)}
          >
            <svg
              className={`${isLoading ? "animate-spin" : "hidden"} text-gray-300 `}
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
            >
              <path
                d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                stroke="currentColor"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                stroke="currentColor"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="text-gray-900"
              ></path>
            </svg>
            Upload Sample Sheet
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
