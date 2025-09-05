import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
    
    title: {
      type: String,
      required: true, 
    },
    description: {
      type: String, 
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"], 
      default: "pending",
    },
    dueDate: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", 
      required: true,
    },
    
  
})

const taskModel = mongoose.model('tasks', taskSchema)
export default taskModel