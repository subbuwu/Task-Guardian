import { Task, User } from "../db/ModelSchema.js";

export const seeUserTasks = async(req, res) => {
    try {
        
        if (req.user.role === "Admin" || req.user.role === "Manager") {
            return res.json({ message: "No Such Regular User Found" });
        }

        const userTasks = await Task.find({ assignedTo : req.user._id });

        res.json({ Your_Tasks: userTasks });

    } catch (error) {
        console.error(error);
        res.json({ message: "Internal server error" });
    }
};

export const updateMyTask = async (req, res) => {
    const { taskIdToUpdate, updateDetails } = req.body;

    if (!taskIdToUpdate || !updateDetails) {
        return res.json({ message: "Task Data Missing" });
    }

    try {
        if (req.user.role === "Admin" || req.user.role === "Manager") {
            return res.json({ message: "Only regular users can update tasks" });
        }

        const userTask = await Task.findOne({ _id: taskIdToUpdate, assignedTo: req.user._id });

        if (!userTask) {
            return res.json({ message: "Task not found or not assigned to the user" });
        }

        const updatedTask = await Task.findByIdAndUpdate(taskIdToUpdate, updateDetails, { new: true });

        if (!updatedTask) {
            return res.json({ message: "No Such Task found" });
        }

        res.json({ message: "Task Updated Successfully", updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteMyTask = async (req, res) => {
    const { taskIdToDelete } = req.body;

    if (!taskIdToDelete) {
        return res.json({ message: "Task Data Missing" });
    }

    try {
        if (req.user.role === "Admin" || req.user.role === "Manager") {
            return res.json({ message: "No Such Regular User Found" });
        }

        const userTask = await Task.findOne({ _id: taskIdToDelete, assignedTo: req.user._id });

        if (!userTask) {
            return res.json({ message: "Task not found or not assigned to the user" });
        }

        const deleteTask = await Task.findByIdAndDelete(taskIdToDelete);

        if (!deleteTask) {
            return res.json({ message: "No Such Task found" });
        }

        res.json({ message: "Your Task Deleted Successfully", deleteTask });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};