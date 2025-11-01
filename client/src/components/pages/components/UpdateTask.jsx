import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { toast } from "sonner";
import { TaskContext } from "@/context/TaskContext";

const UpdateTask = ({ open, setOpen, task }) => {
  const { refreshTasks } = useContext(TaskContext);

  const [input, setInput] = useState({
    title: "",
    description: "",
    due_date: "",
    priority_level: "",
  });

  useEffect(() => {
    if (task) {
      setInput({
        title: task.title || "",
        description: task.description || "",
        due_date: task.due_date ? task.due_date.split("T")[0] : "",
        priority_level: task.priority_level || "",
      });
    }
  }, [task, open]);

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const selectHandler = (value) => {
    setInput({ ...input, priority_level: value });
  };

  const editTask = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_TASK_API}/update-task/${task._id}`,
        input,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        toast.success("Task updated successfully!");
        setOpen(false);
        refreshTasks(); 
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error updating task");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Update Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={editTask} className="flex flex-col gap-6">
          <div className="grid gap-3">
            <Label>Title</Label>
            <Input
              id="title"
              type="text"
              required
              value={input.title}
              onChange={inputHandler}
            />
          </div>

          <div className="grid gap-3">
            <Label>Description</Label>
            <Textarea
              id="description"
              value={input.description}
              onChange={inputHandler}
            />
          </div>

          <div className="grid gap-3">
            <Label>Due Date</Label>
            <Input
              id="due_date"
              type="date"
              required
              value={input.due_date}
              onChange={inputHandler}
            />
          </div>

          <div className="grid gap-3">
            <Label>Priority Level</Label>
            <Select value={input.priority_level} onValueChange={selectHandler}>
              <SelectTrigger>
                <SelectValue placeholder="Select a level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Update Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTask;
