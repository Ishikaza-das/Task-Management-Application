import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router";
import ProfileCircle from "./components/ProfileCircle";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <h1
        className="font-bold text-xl sm:text-2xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        Task <span className="text-blue-700">Manager</span>
      </h1>
      <div className="hidden sm:flex items-center gap-5">
        {user ? (
          <>
            <Button
              variant="link"
              className="text-lg cursor-pointer hover:text-blue-500"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
            <Button
              variant="link"
              className="text-lg cursor-pointer hover:text-blue-500"
              onClick={() => navigate("/task-create")}
            >
              Task
            </Button>
            <ProfileCircle />
          </>
        ) : (
          <>
            <Button
              className="bg-blue-700 hover:bg-blue-600 text-white"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="border-blue-500 text-blue-700 hover:bg-blue-50"
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
          </>
        )}
      </div>
      
      <div className="sm:hidden">
        {user ? (
          <ProfileCircle />
        ) : (
          <Button
            size="sm"
            className="bg-blue-700 hover:bg-blue-600 text-white"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
