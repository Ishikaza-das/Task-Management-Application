import React, { useContext, useState } from "react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";
import UpdateProfile from "./components/UpdateProfile";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
              <AvatarFallback className="bg-pink-300 text-5xl sm:text-6xl font-semibold">
                {user?.fullname?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2 sm:space-y-3">
              <h1 className="font-bold text-2xl sm:text-4xl">{user?.fullname}</h1>
              <h2 className="font-medium text-lg sm:text-xl text-gray-700">{user?.email}</h2>
            </div>
          </div>
          <div className="flex justify-center sm:justify-end">
            <Button
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto flex items-center gap-2"
              onClick={() => setIsOpen(true)}
            >
              <Pen className="w-4 h-4" /> <span className="sm:inline">Edit</span>
            </Button>
          </div>
        </div>
      </div>
      <UpdateProfile open={isOpen} setOpen={setIsOpen} />
    </div>
  );
};

export default Profile;
