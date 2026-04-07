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
  labelDisabled?: boolean;
}

export function DropDownComboBox({
  valueKey,
  labelKey,
  list,
  placeholder,
  name,
  form,
  label,
  labelDisabled,
}: geetingsProps) {
  const {
    control,
    formState: { errors },
  } = form;

  const error = get(errors, name);

  return (
    <div>
      {labelDisabled && (
        <label htmlFor="">
          {label} <span className="text-red-500">*</span>
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Combobox
            items={list}
            value={field.value}
            onValueChange={(val) => field.onChange(val)}
            modal={true}
          >
            <ComboboxInput
              placeholder={placeholder}
              className="rounded-md h-11"
              readOnly
              style={{ cursor: "pointer" }}
            />
            <ComboboxContent className={`cursor-pointer`}>
              <ComboboxEmpty className={`cursor-pointer`}>
                No items found.
              </ComboboxEmpty>
              <ComboboxList>
                {list?.map((item: any) => (
                  <ComboboxItem
                    key={item[valueKey]}
                    value={item[valueKey]}
                    className="cursor-pointer"
                  >
                    {item[labelKey]}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        )}
      />
      {error && <span className="text-red-500 text-xs">{error.message}</span>}
    </div>
  );
}
