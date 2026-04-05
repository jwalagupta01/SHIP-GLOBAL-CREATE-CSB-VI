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
}

export const PrimaryBtn = ({
  text,
  variant,
  className,
  type = "submit",
}: geetingsBtnProps) => {
  return (
    <Button
      className={`${className} cursor-pointer`}
      variant={variant}
      type={type}
    >
      {text}
    </Button>
  );
};
