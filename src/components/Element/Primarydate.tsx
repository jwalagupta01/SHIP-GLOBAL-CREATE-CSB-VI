"use client"; // ✅ Moved to top

import { Controller } from "react-hook-form";
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
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

interface PrimaryDateProps {
  label: string;
  name: string;
  maxDate?: Date; // ✅ kept but optional, not used in disable now
  form: any;
}

export function PrimaryDate({ label, name, form }: PrimaryDateProps) {
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
            field.onChange(today);
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
                  const parsed = new Date(e.target.value);
                  setValue(e.target.value);
                  if (isValidDate(parsed)) {
                    setDate(parsed);
                    setMonth(parsed);
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
                      onSelect={(selected) => {
                        if (!selected) return;
                        selected.setHours(0, 0, 0, 0);
                        setDate(selected);
                        setValue(formatDate(selected));
                        setOpen(false);
                        field.onChange(selected);
                      }}
                      disabled={(day) => {
                        const d = new Date(day);
                        d.setHours(0, 0, 0, 0);

                        // ✅ Block any date AFTER today (future dates disabled)
                        return d > today;
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
