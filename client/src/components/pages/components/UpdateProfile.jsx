import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

const UpdateProfile = ({ open, setOpen }) => {
  const {setUser, user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        fullname:user?.fullname,
        email:user?.email,
        oldPassword:"",
        newPassword:"",
        confirmPassword:""
    })

    const inputHandler = (e) => {
      setInput({...input,[e.target.id]:e.target.value})
    }

    const updateHandler = async (e) => {
      e.preventDefault();

      if(input.newPassword != input.confirmPassword){
        toast.error("New Password and ConfirmPassword did not match")
      }

      const formData = new FormData();
      formData.append("fullname",input.fullname)
      formData.append("email",input.email)
      formData.append("oldPassword",input.oldPassword)
      formData.append("newPassword",input.newPassword)

      try {
        setLoading(true)
        const response = await axios.put(`${import.meta.env.VITE_USER_API}/update-profile`,formData,{
          headers:{"Content-Type":"application/json"},
          withCredentials: true
        })
        if(response.data.success){
          setUser(response.data.user);
          toast.success(response.data.message);
          setOpen(false)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message);
      } finally{
        setLoading(false);
      }
    }
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl">Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={updateHandler}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Jhon Doa"
                  value={input.fullname}
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
                  className="h-12 text-base"
                  value={input.email}
                  onChange={inputHandler}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="old_password">Old Password</Label>
                <Input
                  id="oldPassword"
                  type="text"
                  className="h-12 text-base"
                  value={input.oldPassword}
                  onChange={inputHandler}
                />
              </div>

              
              <div className="grid gap-3">
                <Label htmlFor="new_password">New Password</Label>
                <Input
                  id="newPassword"
                  type="text"
                  className="h-12 text-base"
                  value={input.newPassword}
                  onChange={inputHandler}
                />
              </div>

              
              <div className="grid gap-3">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="text"
                  className="h-12 text-base"
                  value={input.confirmPassword}
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
                  Update
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfile;
