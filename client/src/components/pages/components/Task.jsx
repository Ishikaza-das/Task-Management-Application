import React, { useContext, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TaskCard from "./TaskCard";
import { TaskContext } from "@/context/TaskContext";

const Task = () => {
  const { allTask } = useContext(TaskContext);

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const getFilteredTasks = () => {
    return allTask.filter((task) => {
      const matchesStatus =
        !statusFilter || task.progress.toLowerCase() === statusFilter;
      const matchesPriority =
        !priorityFilter || task.priority_level.toLowerCase() === priorityFilter;

      return matchesStatus && matchesPriority;
    });
  };

  const filteredTasks = getFilteredTasks();

  return (
    <>
      <div className="flex py-4 md:gap-4 justify-between md:justify-normal">
        <div>
          <Select onValueChange={(value) => setStatusFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select onValueChange={(value) => setPriorityFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskCard key={task._id} task={task} />)
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No tasks match your filters.
          </p>
        )}
      </div>
    </>
  );
};

export default Task;
