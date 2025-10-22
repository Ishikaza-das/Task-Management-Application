import React, { useState } from "react";
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

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_USER_API}/register`,
        formData,
        {
          headers:{"Content-Type":"application/json"}
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
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
          <form onSubmit={signupHandler}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Jhon Doa"
                  value={input.fullname}
                  required
                  className="h-12 text-base"
                  onChange={inputHandler}
                />
              </div>

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
                  Signup
                </Button>
              )}
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <p className="text-sm text-gray-600 mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
