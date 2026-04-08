import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavProfileIcon() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="rounded-full w-10 h-10 cursor-pointer bg-pink-500 text-white text-lg hover:bg-pink-500 hover:text-white border-none"
        >
          lk
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-80">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem className="flex flex-row gap-x-3">
            <div className="h-10 w-10 rounded-full bg-pink-500 flex items-center justify-center text-2xl text-white hover:text-white">
              lk
            </div>
            <div>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
