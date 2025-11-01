import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

const TaskCard = ({ task }) => {
  return (
    <div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">{task?.title}</CardTitle>
          <CardDescription className="font-medium">
            {task?.description}
          </CardDescription>
          <CardAction>
            <Button variant="ghost">
              <MoreVertical />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <h1>Dead Line: {task?.due_date}</h1>
            <Badge
              className={`${
                task.progress === "pending" ? "bg-blue-500" : "bg-green-500"
              }`}
            >
              {task?.progress.toUpperCase()}
            </Badge>
            <Badge
              className={`${
                task.priority_level === "high"
                  ? "bg-red-500"
                  : task.priority_level === "medium"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {task?.priority_level?.toUpperCase()}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCard;
