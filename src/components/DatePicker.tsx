"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalenderIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "./ui/popover";

interface DatePickerProps {
    value: Date | undefined;
    onChange: (date: Date) => void;
    classname?: string;
    placeholder?: string;
}

const DatePicker = ({
    onChange,
    value,
    classname,
    placeholder = "Select date"
}: DatePickerProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="lg"
                    className={cn(
                        "w-full justify-start text-left font-normal px-3",
                        !value && "text-muted-foreground",
                        classname
                    )}
                >
                    <CalenderIcon className="mr-4 h-4 w-4" />
                    {value ? format(value, "PPP") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(date) => onChange(date as Date)}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker