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
import { useExportDataMutation } from "@/lib/features/services/individualBankApi";

const intervals = ["Annual", "Quarter 1", "Quarter 2", "Quarter 3"];

const currentYear = new Date().getFullYear();
const startYear = 2011;
const years = [];

for (let year = startYear; year <= currentYear; year++) {
  years.push(year);
}

export function DataDialog({ banks, handleAction }) {
  const [getSheet] = useExportDataMutation();

  const [bank, setBank] = useState(banks[0].name);
  const [interval, setInterval] = useState(intervals[0]);
  const [year, setYear] = useState(years[0]);

  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = new FileReader();

    file.onload = function () {
      setPreview(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
    });

  async function handleUpload(e) {
    e.preventDefault();

    if (typeof acceptedFiles[0] === "undefined") return;

    const formData = new FormData();

    formData.append("file", acceptedFiles[0]);

    console.log(formData);
  }

  async function handleDownload() {
    // console.log("Hello");
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
      // const response = await getSheet({ bankId, year, quarter });
      window.open(`http://154.49.243.15:8003/api/individualBank/export?bankId=${bankId}&year=${year}&quarter=${quarter}`)
      // console.log(response)
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
            <div className="flex flex-col sm:flex-row justify-between w-full gap-2 text-foreground">
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
              <div
                {...getRootProps()}
                className="flex justify-center w-full p-5 rounded-md border border-toggle"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the sheet here ...</p>
                ) : (
                  <p>Drag n drop or click to upload sheet</p>
                )}
              </div>
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="flex flex-row justify-between sm:justify-between w-full">
        <Button
          className="text-xs"
          onClick={() => {
            handleDownload();
          }}
        >
          Get Sample Sheet
        </Button>
        <Button
          variant="secondary"
          className="text-primary text-xs"
          onClick={() => handleUpload()}
        >
          Upload Sample Sheet
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
