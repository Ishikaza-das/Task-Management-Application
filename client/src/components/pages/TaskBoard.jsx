import React, { useContext, useState } from "react";
import Navbar from "../shared/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";
import { TaskContext } from "@/context/TaskContext";

const TaskBoard = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    due_date: "",
    priority_level: "",
  });
  const { fetchTasks } = useContext(TaskContext);

  const inputHnadler = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const selectHandler = (value) => {
    setInput({ ...input, priority_level: value });
  };

  const createTask = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("due_date", input.due_date);
    formData.append("priority_level", input.priority_level);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_TASK_API}/create_task`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchTasks();
        setInput({
          title: "",
          description: "",
          due_date: "",
          priority_level: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-20 px-4">
        <Card className="w-full max-w-md md:max-w-lg p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Create Task</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={createTask}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label className="font-medium">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="TODO"
                    required
                    className="h-12 text-base"
                    value={input.title}
                    onChange={inputHnadler}
                  />
                </div>

                <div className="grid gap-3">
                  <Label className="font-medium">Description</Label>
                  <Textarea
                    id="description"
                    type="text"
                    placeholder="TODO this"
                    className="h-12 text-base"
                    value={input.description}
                    onChange={inputHnadler}
                  />
                </div>

                <div className="grid gap-3">
                  <Label className="font-medium">Due Date</Label>
                  <Input
                    id="due_date"
                    type="date"
                    required
                    className="h-12 text-base"
                    value={input.due_date}
                    onChange={inputHnadler}
                  />
                </div>

                <div className="grid gap-3">
                  <Label className="font-medium">Priority Level</Label>
                  <Select value={input.priority_level} onValueChange={selectHandler}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Level" />
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
                <Button
                  variant="destructive"
                  className="w-full h-12 text-lg cursor-pointer"
                  type="submit"
                >
                  Add Task
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskBoard;
