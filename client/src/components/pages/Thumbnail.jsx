import Navbar from "@/components/shared/Navbar";
import React from "react";
import FeatureCard from "./components/FeatureCard";
import { Notebook, User, Watch } from "lucide-react";
import Footer from "../shared/Footer";

const Thumbnail = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div className="max-w-7xl mx-auto my-20 ">
          <header className="px-2 md:px-0">
            <h1 className="font-bold text-5xl md:text-6xl leading-tight text-gray-900 max-w-3xl">
              Your personal space to <span className="text-blue-600">plan</span>
              , <span className="text-blue-600">prioritize</span>, and{" "}
              <span className="text-blue-600">perform</span>.
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl">
              Stay organized, stay productive — manage all your tasks
              effortlessly in one place.
            </p>
          </header>

          <article className="mt-15 px-2 space-y-4">
            <div className="text-center">
              <h1 className="inline-block font-medium text-lg bg-gray-300 rounded-md text-gray-700 px-2">Features</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 space-y-3">
              <FeatureCard title={"User Authentication"} desc={"Manage your profile and settings"} para={" Secure login, registration, and profile updates with JWT authentication."} Icon={User}/>
              <FeatureCard title={"Task Management"} desc={"Full CRUD operations to manage your tasks"} para={"Create, view, update, and delete your tasks with ease. Assign each task to yourself and keep everything organized."} Icon={Notebook}/>
              <FeatureCard title={"Priority & Due Dates"} desc={"Stay on top of important tasks"} para={"Set task priorities and due dates to focus on what matters most. Sort and filter tasks by priority or deadline to stay productive."} Icon={Watch}/>
            </div>
          </article>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Thumbnail;
