import taskModel from "../models/taskModel.js"
export const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body
  if (!title || !description || !dueDate) {
    return res.json({ message: "title,desc,duedat, user are required" })
  }
const newTask = await taskModel.create({
  title,
  description,
  dueDate,
  user: req.user.userid   // ✅ use userid
});
  res.json({ message: "new tark created", newTask })
}

export const getAllTasks = async (req, res) => {
  const tasks = await taskModel.find({})
  res.json({ message: 'tasks fetched successfully', tasks })
}

export const getMyTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({ user: req.user.id || req.user.userid });
    res.status(200).json({
      message: tasks.length > 0 ? "Tasks fetched" : "No tasks found",
      tasks, // always an array
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error", tasks: [] });
  }
};


export const editTaskById = async (req, res) => {
  const {id} = req.params
  const findTask = taskModel.findById(id)
  if(!findTask){
    return res.json({message : "no task found"})
  }

  const updateTask = await taskModel.findByIdAndUpdate(id,req.body,{new:true})
  res.json({message:"task updated",updateTask})

}

export const deleteTaskById = async (req,res)=>{
  const {id} =  req.params
  const findTask = taskModel.findById(id)
  if(!findTask){
    return res.json({message:"task not found"})
  }
  const deleteTask = await taskModel.findByIdAndDelete(id)
  res.json({message : "deleted task successfully"})
}