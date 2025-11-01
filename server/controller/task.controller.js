const Task = require("../models/task.model");

const createTask = async (req, res) => {
  try {
    const { title, description, due_date, priority_level, progress } = req.body;
    const userId = req.id;

    if (!title || !due_date || !priority_level) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let task = await Task.create({
      title,
      description,
      due_date,
      priority_level,
      progress,
      userID: userId,
    });

    return res.status(200).json({
      message: "Task Created",
      task,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getUserTask = async (req, res) => {
  try {
    const userId = req.id;
    const task = await Task.find({ userID: userId });
    if (!task) {
      return res.status(400).json({
        message: "No Task Created",
        success: false,
      });
    }
    return res.status(200).json({
      task,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const editTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, due_date, priority_level, progress } = req.body;
    const updateTask = { title, description, due_date, priority_level, progress };
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(400).json({
        message: "Task not found",
        success: false,
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      updateTask,
      {new: true}
    );

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const deleteTask = async (req,res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if(!task){
            return res.status(400).json({
                message:"No task found",
                success: false
            })
        }
        await Task.findByIdAndDelete(taskId);
        return res.status(200).json({
            message:"Task Deleted",
            success: true
        });
    } catch (error) {
        return res.status(400).json({
            message:error.message,
            success: false
        })
    }
}

module.exports = { createTask, getUserTask, editTask, deleteTask };
