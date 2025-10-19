import { Button } from "@/components/ui/button";
import { Table } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="max-w-7xl mx-auto my-2">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-2xl">
            Task <span className="text-blue-700">Manager</span>
          </h1>
          <div className="gap-3 flex">
            <Button className="bg-blue-500 hover:bg-blue-700">Login</Button>
            <Button variant="outline" className="border-blue-500">Signup</Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
