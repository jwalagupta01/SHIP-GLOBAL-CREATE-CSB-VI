import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { get } from "react-hook-form";
import { ButtonGroup } from "@/components/ui/button-group";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

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

  const error = get(errors, name);

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
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </Field>
  );
}

interface geetingsPassProps {
  type: string;
  label: string;
  form: any;
  name: string;
  showPass: boolean;
  setShowPass: any;
}

export function PassInput({
  type,
  label,
  form,
  name,
  showPass,
  setShowPass,
}: geetingsPassProps) {
  const {
    register,
    formState: { errors },
  } = form;

  const error = get(errors, name);

  return (
    <div className="flex flex-col w-full gap-y-2">
      <label htmlFor="" className="text-sm">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="w-full relative">
        <input
          type={type}
          className="border border-gray-200 h-11 w-full rounded-md px-3 outline-0 focus-visible:ring-1 focus-visible:border-blue-900 focus-visible:ring-blue-500/30"
          placeholder="Enter Your Password"
          {...register(name)}
        />
        <p
          className="absolute top-3 right-5 text-2xl cursor-pointer"
          onClick={() => {
            setShowPass(!showPass);
          }}
        >
          {showPass ? <FaEye /> : <FaEyeSlash />}
        </p>
      </div>
      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
}
