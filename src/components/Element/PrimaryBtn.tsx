import { Button } from "@/components/ui/button";

interface geetingsBtnProps {
  text: any;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";
  className: string;
  type?: "submit" | "button" | "reset";
  [key: string]: any;
}

export const PrimaryBtn = ({
  text,
  variant,
  className,
  type,
  ...rest
}: geetingsBtnProps) => {
  return (
    <Button
      {...rest}
      className={`${className} cursor-pointer`}
      variant={variant}
      type={type}
    >
      {text}
    </Button>
  );
};
