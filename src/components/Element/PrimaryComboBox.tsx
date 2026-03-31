import { Controller } from "react-hook-form";
("use client");

import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox";

interface greetingCombobox<T> {
  id: string;
  list: T[];
  label: string;
  placeholder: string;
  form: any;
  name: string;
}

export const UserComboBox = <T,>({
  id,
  list,
  label,
  placeholder,
  form,
  name,
}: greetingCombobox<T>) => {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Combobox
            items={list}
            value={field.value}
            onValueChange={field.onChange}
          >
            <ComboboxTrigger
              render={
                <Button
                  variant="outline"
                  className="h-10 justify-between cursor-pointer"
                >
                  {field.value ? (
                    <span>
                      {field.value.first_name}/{field.value.last_name}/
                      {field.value.phone}/{field.value.address}/
                      {field.value.document}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">{placeholder}</span>
                  )}
                </Button>
              }
            />
            <ComboboxContent>
              <ComboboxInput showTrigger={false} placeholder="Search" id={id} />
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem
                    key={item.document}
                    value={item}
                    className="cursor-pointer data-highlighted:bg-blue-300/30 data-highlighted:text-blue-900 **:text-blue-900 rounded-none"
                  >
                    {item.first_name}/{item.last_name}/{item.phone}/
                    {item.address}/{item.document}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        )}
      />

      {errors[name] && (
        <span className="text-red-500 text-xs">{errors[name]?.message}</span>
      )}
    </div>
  );
};

interface geetingsBasicProps {
  label: string;
  list: any;
  fOption: string;
  name: string;
  valueKey: string;
  labelKey: string;
  form: any;
}

export function BasicComboBox({
  label,
  list,
  fOption,
  name,
  valueKey,
  labelKey,
  form,
}: geetingsBasicProps) {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <div className="w-full flex flex-col gap-y-1">
      <label>
        {label} <span className="text-red-500">*</span>
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Combobox
            items={list}
            value={
              list?.find((item: any) => item[valueKey] === field.value) ?? null
            }
            onValueChange={(selectedItem: any) =>
              field.onChange(selectedItem[valueKey])
            }
          >
            <ComboboxTrigger
              render={
                <Button
                  variant="outline"
                  className="w-full h-12 justify-between font-normal cursor-pointer"
                >
                  {field.value ? (
                    <span>
                      {
                        list?.find(
                          (item: any) => item[valueKey] === field.value,
                        )?.[labelKey]
                      }
                    </span>
                  ) : (
                    <span className="text-muted-foreground">{fOption}</span>
                  )}
                </Button>
              }
            />
            <ComboboxContent>
              <ComboboxInput showTrigger={false} placeholder="Search" />
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList className="m-0">
                {(item) => (
                  <ComboboxItem
                    key={item[valueKey]}
                    value={item}
                    className="cursor-pointer **:text-blue-900 data-highlighted:bg-blue-300/30 data-highlighted:text-blue-900 rounded-none"
                  >
                    {item[labelKey]}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        )}
      />

      {errors[name] && (
        <p className="text-red-500 text-xs">{errors[name].message}</p>
      )}
    </div>
  );
}
