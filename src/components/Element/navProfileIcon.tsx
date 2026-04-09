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
import { removeToken } from "@/Redux/HomeData.ts/TokenSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function NavProfileIcon() {
  const navigate = useNavigate();
  const profileDetails = useSelector(
    (state: any) => state?.profileDetails?.personalDetail,
  );
  const dispatch = useDispatch();

  // Logout click
  const Logout = async () => {
    try {
      dispatch(removeToken());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="rounded-full w-10 h-10 cursor-pointer bg-pink-500 text-white text-lg hover:bg-pink-500 hover:text-white border-none"
        >
          {profileDetails.firstname?.charAt(0).toUpperCase()}
          {profileDetails.lastname?.charAt(0).toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-80 *:cursor-pointer">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem className="flex flex-row gap-x-3">
            <div className="h-10 w-10 rounded-full bg-pink-500 flex items-center justify-center text-xl text-white hover:text-white">
              {profileDetails.firstname?.charAt(0).toUpperCase()}
              {profileDetails.lastname?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p>{profileDetails.firstname}</p>
              <p>{profileDetails.lastname}</p>
              <p className="text-xs text-gray-500">{profileDetails.email}</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem onClick={Logout}>LOGOUT</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
