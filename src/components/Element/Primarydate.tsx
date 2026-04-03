import { Controller } from "react-hook-form";

("use client");

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

interface getingsprops {
  label: string;
  name: string;
  minDate?: Date;
  maxDate?: Date;
  form: any;
}

export function PrimaryDate({
  label,
  name,
  minDate,
  maxDate,
  form,
}: getingsprops) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(today);
  const [month, setMonth] = React.useState<Date | undefined>(today);
  const [value, setValue] = React.useState(formatDate(today));

  const { control } = form;
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={today}
      render={({ field }) => {
        React.useEffect(() => {
          if (!field.value) {
            field.onChange(today); // ✅ auto set today
          }
        }, [field]);
        return (
          <Field className="w-full">
            <FieldLabel htmlFor="date-required">
              {label} <span className="text-red-500">*</span>
            </FieldLabel>
            <InputGroup className="h-11 w-full">
              <InputGroupInput
                id="date-required"
                value={value}
                readOnly
                className="w-full"
                placeholder="June 01, 2025"
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  setValue(e.target.value);
                  if (isValidDate(date)) {
                    setDate(date);
                    setMonth(date);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setOpen(true);
                  }
                }}
              />
              <InputGroupAddon align="inline-end">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <InputGroupButton
                      id="date-picker"
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Select date"
                    >
                      <CalendarIcon />
                      <span className="sr-only">Select date</span>
                    </InputGroupButton>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-full overflow-hidden p-0"
                    align="end"
                    alignOffset={0}
                    sideOffset={10}
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      month={month}
                      onMonthChange={setMonth}
                      onSelect={(date) => {
                        if (!date) return;

                        date.setHours(0, 0, 0, 0); // normalize

                        setDate(date);
                        setValue(formatDate(date));
                        setOpen(false);
                        field.onChange(date);
                      }}
                      disabled={(date) => {
                        if (!minDate || !maxDate) return false;

                        const d = new Date(date);
                        d.setHours(0, 0, 0, 0);

                        const min = new Date(minDate);
                        min.setHours(0, 0, 0, 0);

                        const max = new Date(maxDate);
                        max.setHours(0, 0, 0, 0);

                        return d < min || d > max;
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        );
      }}
    />
  );
}
