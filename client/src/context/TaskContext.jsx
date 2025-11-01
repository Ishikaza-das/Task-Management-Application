import axios from "axios";
import { useEffect, useState, createContext } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [allTask, setAllTask] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_TASK_API}/getTask`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setAllTask(response.data.task);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ allTask, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
