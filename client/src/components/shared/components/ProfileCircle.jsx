import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ProfileCircle = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const logout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USER_API}/logout`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setUser(null);
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <Avatar>
            <AvatarFallback className="bg-pink-200 font-medium">
              {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-48 sm:w-56">
        <div className="flex flex-col items-start space-y-3">
          <Button
            variant="link"
            className="text-lg cursor-pointer"
          >
            Profile
          </Button>
          <div className="flex flex-col items-start space-y-3 w-full sm:hidden">
            <Button
              variant="link"
              className="text-lg cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>

            <Button
              variant="link"
              className="text-lg cursor-pointer"
              onClick={() => navigate("/task-create")}
            >
              Task
            </Button>
          </div>

          <Button
            variant="link"
            className="text-lg cursor-pointer text-red-500"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileCircle;
