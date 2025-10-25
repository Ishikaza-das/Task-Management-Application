import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";

const Login = () => {
    const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, user } = useContext(AuthContext)

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_USER_API}/login`,
        formData,
        {
          headers:{"Content-Type":"application/json"},
          withCredentials: true
        }
      );
      if (response.data.success) {
        setUser(response.data.user)
        toast.success(response.data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(user){
      navigate("/dashboard");
    }
  },[user])
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md md:max-w-lg p-6 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">
                  Create your account
                </CardTitle>
                <CardDescription className="text-base text-gray-600">
                  Enter your fullname, email and password below to access your tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={loginHandler}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        required
                        className="h-12 text-base"
                        value={input.email}
                        onChange={inputHandler}
                      />
                    </div>
      
                    <div className="grid gap-3">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        className="h-12 text-base"
                        value={input.password}
                        onChange={inputHandler}
                      />
                    </div>
      
                    {loading ? (
                      <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700">
                        <Loader2 className="animate-spin h-4 w-4 mr-2" /> Please
                        wait...
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 cursor-pointer"
                      >
                        Login
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <p className="text-sm text-gray-600 mt-3">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
