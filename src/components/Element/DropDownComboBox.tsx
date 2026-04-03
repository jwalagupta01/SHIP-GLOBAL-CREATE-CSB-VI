import { Controller } from "react-hook-form";
import { get } from "react-hook-form";

("use client");

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

interface geetingsProps {
  valueKey: string;
  labelKey: string;
  list: any;
  placeholder: string;
  name: string;
  form: any;
  label: string;
}

export function DropDownComboBox({
  valueKey,
  labelKey,
  list,
  placeholder,
  name,
  form,
  label,
}: geetingsProps) {
  const {
    control,
    formState: { errors },
  } = form;

  const error = get(errors, name);

  return (
    <div>
      <label htmlFor="">
        {label} <span className="text-red-500">*</span>
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Combobox
            items={list}
            value={field.value}
            onValueChange={(val) => field.onChange(val)}
            defaultValue={list?.[0]?.[valueKey]}
            defaultInputValue={list?.[0]?.[valueKey]}
          >
            <ComboboxInput
              placeholder={placeholder}
              className="rounded-md h-11"
            />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem
                    key={item[valueKey]}
                    value={item[valueKey]}
                    className="data-highlighted:bg-blue-400/30 cursor-pointer data-highlighted:text-blue-900 **:text-blue-900"
                  >
                    {item[labelKey]}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        )}
      />
      {error && <span className="text-red-500 text-xs">{error.message}</span>}
    </div>
  );
}
