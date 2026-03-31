import { Button } from "@/components/ui/button";

interface geetingsBtnProps {
  text: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";
  className: string;
}

export const PrimaryBtn = ({
  text,
  variant,
  className,
}: geetingsBtnProps) => {
  return (
    <Button
      className={`${className} cursor-pointer`}
      variant={variant}
    >
      {text}
    </Button>
  );
};
