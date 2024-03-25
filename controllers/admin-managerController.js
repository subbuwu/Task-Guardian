import { Task, User } from "../db/ModelSchema.js";

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find({role : "User"});

    const allUsers = [];

    for (const user of users) {
      const tasks = await Task.find({ assignedTo: user._id });
      allUsers.push({ user, tasks });
    }

    // let allUsers = await Promise.all(users.map(async (user) => {
    //     const tasks = await Task.find({ assignedTo: user._id });
    //     return { user, tasks };
    // }));

    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTaskAndAssign = async (req, res) => {
  try {
    const { title,assignedTo } = req.body;

    if(!title || !assignedTo) return res.send("Task Data Missing");

    const newTask = new Task({
      title: title,
      assignedTo: assignedTo,
      completed: false,
    });

    const savedTask = await newTask.save();

    res.json({
      savedTask: savedTask,
      message: "Created Task",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateTask = async(req,res) => {
  const { taskId,updateDetails } = req.body;

  if(!taskId || !updateDetails) return res.json("Missing Task Update Data");

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateDetails);
    
    if (!updatedTask) {
        return res.json({ message: 'Task not found' });
    }

    res.json({ message: 'Task updated successfully' });

  } catch (error) {
    res.json({ message: error.message });
  }

}

export const deleteTask = async(req,res) => {
  const { taskId } = req.body;

  if(!taskId) return res.json("Missing Task Data - Task id")

  const taskToDelete = await Task.deleteOne({_id : taskId});

  if(taskToDelete.deletedCount === 0) return res.json("No Such Task Deleted")

  console.log(taskToDelete)

  return res.json({
    taskDeleted : taskToDelete,
    message : "Task Deleted Succesfully"
  })

}

export const updateUserRole = async(req,res) => {
  const { id,roleToUpdate } = req.body;

  
  if(!id) return res.json("Missing User Id");


  const updateUser = await User.findOneAndUpdate(
    { _id: id },
    { role: roleToUpdate },
    { new: true } 
  );

  if(!updateUser) return res.json("No Such user found");

  res.json({
    message : "Role Updated"
  })

}