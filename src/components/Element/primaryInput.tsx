import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface geetingsProps {
  placeholder: string;
  label: string;
  type: string;
  name: string;
  form: any;
}

export function PrimaryInput({
  placeholder,
  label,
  type,
  name,
  form,
}: geetingsProps) {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <Field>
      <FieldLabel htmlFor={name} className="text-sm">
        {label}
        <span className="text-red-500">*</span>
      </FieldLabel>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        className="h-11 focus:border focus:border-blue-900 focus-visible:ring-1 focus-visible:border-blue-900 focus-visible:ring-blue-500/30"
        {...register(name)}
      />
      {errors[name] && (
        <FieldDescription className="text-xs text-red-500">
          {errors[name]?.message}
        </FieldDescription>
      )}
    </Field>
  );
}
