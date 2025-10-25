import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "sonner";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_USER_API}/logout`, { withCredentials: true });
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
    <nav className="max-w-7xl mx-auto px-4 py-3 relative">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl sm:text-2xl cursor-pointer" onClick={() => navigate("/")}>
          Task <span className="text-blue-700">Manager</span>
        </h1>

        <div className="hidden sm:flex items-center gap-5">
          {user ? (
            <>
              <Button variant="link" onClick={() => navigate("/dashboard")}>Dashboard</Button>
              <Button variant="link" onClick={() => navigate("/task-create")}>Task</Button>
              <Button variant="link" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate("/login")}>Login</Button>
              <Button variant="outline" onClick={() => navigate("/signup")}>Signup</Button>
            </>
          )}
        </div>

        <div className="sm:hidden">
          <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden absolute top-full right-0 w-64 bg-white shadow-md rounded-b-md mt-2 p-4 flex flex-col gap-2 z-50">
          {user ? (
            <>
              <Button variant="link" size="sm" className="w-full text-left" onClick={() => { navigate("/dashboard"); setIsOpen(false); }}>Dashboard</Button>
              <Button variant="link" size="sm" className="w-full text-left" onClick={() => { navigate("/task-create"); setIsOpen(false); }}>Task</Button>
              <Button variant="link" size="sm" className="w-full text-left" onClick={() => { logout(); setIsOpen(false); }}>Logout</Button>
            </>
          ) : (
            <>
              <Button size="sm" className="w-full text-left bg-blue-700 hover:bg-blue-600 text-white" onClick={() => { navigate("/login"); setIsOpen(false); }}>Login</Button>
              <Button size="sm" variant="outline" className="w-full text-left border-blue-500 text-blue-700 hover:bg-blue-50" onClick={() => { navigate("/signup"); setIsOpen(false); }}>Signup</Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
