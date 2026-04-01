"use client";

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
}

export function DropDownComboBox({
  valueKey,
  labelKey,
  list,
  placeholder,
}: geetingsProps) {
  return (
    <div>
      <label htmlFor="">
        Invoice Currency <span className="text-red-500">*</span>
      </label>
      <Combobox items={list}>
        <ComboboxInput placeholder={placeholder} className="rounded-md h-11" />
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
    </div>
  );
}
