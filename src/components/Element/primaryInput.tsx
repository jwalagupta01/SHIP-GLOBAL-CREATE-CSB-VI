import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { get } from "react-hook-form";
import { ButtonGroup } from "@/components/ui/button-group";

interface geetingsProps {
  placeholder: string;
  label: string;
  type: string;
  name: string;
  form: any;
  isRequired: boolean;
}

export function PrimaryInput({
  placeholder,
  label,
  type,
  name,
  form,
  isRequired,
}: geetingsProps) {
  const {
    register,
    formState: { errors },
  } = form;

  const error = get(errors, name);

  return (
    <Field>
      <FieldLabel htmlFor={name} className="text-sm">
        {label}
        {!isRequired && <span className="text-red-500">*</span>}
      </FieldLabel>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        className="h-11 focus-visible:ring-1 focus-visible:border-blue-900 focus-visible:ring-blue-500/30"
        {...register(name)}
      />
      {error && (
        <FieldDescription className="text-xs text-red-500">
          {error.message}
        </FieldDescription>
      )}
    </Field>
  );
}

interface geetingssecondProps {
  label: string;
  stxt: string;
  placeholder: string;
  form: any;
  name: string;
}

export function SecondryInput({
  placeholder,
  stxt,
  label,
  form,
  name,
}: geetingssecondProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Field>
      <FieldLabel htmlFor="input-button-group">
        {label} <span className="text-red-500">*</span>{" "}
      </FieldLabel>
      <ButtonGroup className="">
        <Input
          id="input-button-group"
          placeholder={placeholder}
          {...register(name)}
          className="h-11 focus-visible:ring-1 focus-visible:border-blue-900 focus-visible:ring-blue-500/30"
        />
        <Button
          variant="outline"
          className="h-11 text-lg font-normal disabled:bg-gray-300 disabled:text-black disabled:opacity-80"
          disabled
        >
          {stxt}
        </Button>
      </ButtonGroup>
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
    </Field>
  );
}

import { InfoIcon } from "lucide-react";
// import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

export function eyeBtn() {
  return (
    <Field>
      <FieldLabel htmlFor="input-group-url">Website URL</FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-group-url" placeholder="example.com" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InfoIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
