import React, { useContext } from "react";
import Navbar from "../shared/Navbar";
import Task from "./components/Task";
import { TaskContext } from "@/context/TaskContext";

const Dashboard = () => {
  const {allTask} = useContext(TaskContext);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-500 text-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Total Tasks</h2>
              <p className="text-6xl font-bold">{allTask.length}</p>
            </div>
            <p className="mt-4 text-blue-100">All tasks you have created so far</p>
          </div>

          <div className="bg-amber-400 text-gray-900 rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Tasks Completed</h2>
              <p className="text-6xl font-bold">18</p>
            </div>
            <p className="mt-4 text-gray-800">Tasks successfully finished</p>
          </div>
        </div>

        <Task/>
      </div>
    </div>
  );
};

export default Dashboard;
