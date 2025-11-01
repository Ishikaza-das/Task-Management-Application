import React, { useContext } from "react";
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
 const {allTask} = useContext(TaskContext)
  return (
    <>
    <div className="flex py-4 md:gap-4 justify-between md:justify-normal">
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="complete">Complete</SelectItem>
              <SelectItem value="pendding">Pendding</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select>
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
    <div className="grid grid-cols-1 md:grid-cols-3 space-y-4">
        {
            allTask.map((task,index) =>(
                <div key={index}>
                    <TaskCard task={task}/>
                </div>
            ))
        }
    </div>
    </>
  );
};

export default Task;
