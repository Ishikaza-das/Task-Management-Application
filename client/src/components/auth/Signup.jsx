import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from 'react-router-dom'

const Signup = () => {
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <Card className="w-full max-w-md md:max-w-lg p-6 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Create your account</CardTitle>
          <CardDescription className="text-base text-gray-600">
            Enter your fullname, email and password below to access your tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
               <div className="grid gap-3">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jhon Doa"
                  required
                  className="h-12 text-base"
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
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="h-12 text-base"
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            type="submit"
            className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
          >
            Signup
          </Button>
          <p className="text-sm text-gray-600 mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signup
