import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { TaskContext } from "@/context/TaskContext";
import { toast } from "sonner";

const TaskCard = ({ task }) => {
  const { refreshTasks } = useContext(TaskContext);

  const handleProgressChange = async (e) => {
    const newProgress = e.target.checked ? "complete" : "pending";

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_TASK_API}/update-task/${task._id}`,
        { progress: newProgress },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Task status updated!");
        refreshTasks(); 
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating task");
    }
  };

  return (
    <Card className="w-full max-w-sm relative">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-bold text-2xl">{task?.title}</CardTitle>
            <CardDescription className="font-medium">
              {task?.description}
            </CardDescription>
          </div>

          {/* Popover Menu */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-1 hover:bg-gray-100 rounded-md">
                <MoreVertical size={20} />
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              side="bottom"
              className="w-48 sm:w-56 p-3 rounded-lg shadow-md border bg-white"
            >
              <div className="flex flex-col gap-3">
                {/* ✅ Checkbox to mark complete */}
                <div className="flex items-center gap-2">
                  <Input
                    type="checkbox"
                    id={`complete-${task._id}`}
                    className="w-4 h-4"
                    checked={task?.progress === "complete"}
                    onChange={handleProgressChange}
                  />
                  <Label
                    htmlFor={`complete-${task._id}`}
                    className="text-base cursor-pointer"
                  >
                    Complete
                  </Label>
                </div>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-base hover:bg-gray-100"
                >
                  Edit
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-base text-red-500 hover:bg-red-50"
                >
                  Delete
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2 items-center">
          <p className="text-sm text-gray-600">
            Deadline: {task?.due_date || "N/A"}
          </p>
          <Badge
            className={`${
              task?.progress === "pending" ? "bg-blue-500" : "bg-green-500"
            } text-white`}
          >
            {task?.progress?.toUpperCase()}
          </Badge>
          <Badge
            className={`${
              task?.priority_level === "high"
                ? "bg-red-500"
                : task?.priority_level === "medium"
                ? "bg-yellow-500"
                : "bg-green-500"
            } text-white`}
          >
            {task?.priority_level?.toUpperCase()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
