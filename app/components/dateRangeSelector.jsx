import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { BiCalendar } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

const DateRangeSelector = ({ years, date, setDate }) => {
    if (!years || years.length === 0) {
        return (
            <Skeleton className="hidden lg:flex h-[50px] w-full bg-secondary"></Skeleton>
        );
    }

    return (
        <div className="flex gap-4">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="sm"
                    variant="dropdown"
                    className={`gap-2 dark:border-2 rounded-lg`}
                >
                    <BiCalendar size={20} /> {date.startDate.getFullYear()}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuRadioGroup
                    value={`${date.startDate.getFullYear()}`}
                    onValueChange={(year) => {
                        setDate((prev) => {
                            return {
                                startDate: new Date(
                                    Date.UTC(
                                        year,
                                        date.startDate.getMonth(),
                                        1, 0, 0, 0, 0
                                    )
                                ),
                                endDate: prev.endDate,
                            };
                        });
                    }}
                >
                    {years
                        .filter(
                            (year) =>
                                Number(year) < Number(date.endDate.getFullYear())
                        )
                        .map((year, index) => {
                            return (
                                <DropdownMenuRadioItem
                                    key={index}
                                    value={`${year}`}
                                    className="flex flex-row justify-center w-full"
                                >
                                    {year}
                                </DropdownMenuRadioItem>
                            );
                        })}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="justify-center flex items-center">
            to
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="sm"
                    variant="dropdown"
                    className={`gap-2 dark:border-2 rounded-lg`}
                >
                    <BiCalendar size={20} /> {date.endDate.getFullYear()}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuRadioGroup
                    value={`${date.endDate.getFullYear()}`}
                    onValueChange={(year) => {
                        setDate((prev) => {
                            return {
                                endDate: new Date(
                                    Date.UTC(
                                        year,
                                        date.endDate.getMonth(),
                                        1, 0, 0, 0, 0
                                    )
                                ),
                                startDate: prev.startDate,
                            };
                        });
                    }}
                >
                    {years
                        .filter(
                            (year) =>
                                Number(year) > Number(date.startDate.getFullYear())
                        )
                        .map((year, index) => {
                            return (
                                <DropdownMenuRadioItem
                                    key={index}
                                    value={`${year}`}
                                    className="flex flex-row justify-center w-full"
                                >
                                    {year}
                                </DropdownMenuRadioItem>
                            );
                        })}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
    )
}

export default DateRangeSelector