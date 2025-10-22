import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="max-w-7xl mx-auto px-4 py-3 ">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl sm:text-2xl">
          Task <span className="text-blue-700">Manager</span>
        </h1>
        <div className="hidden sm:flex gap-3">
          <Button
            size="lg"
            className="bg-blue-700 hover:bg-blue-600 text-white cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-blue-500 text-blue-700 hover:bg-blue-50 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
        </div>
        <div className="sm:hidden">
          <Button
            size="sm"
            className="bg-blue-700 hover:bg-blue-600 text-white cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
