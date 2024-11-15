import asyncHandler from "express-async-handler"
import Task from "../models/TaskModel.js";


export const CreateTask = asyncHandler(async(req,res)=>{
   try {
     const{title,description,dueDate,priority,status} = req.body;
     console.log(title,description);

     if(!title || title.trim()=== ""){
        res.status(400).json({message:"Title is required"})
     }
     if(!description || description.trim()=== ""){
        res.status(400).json({message:"Description is required"})
     }

     const task = new Task({
        title,
        description,
        dueDate,
        priority,
        status,
        user:req.user._id,
     })
    console.log(task)
     await task.save();

     res.status(201).json(task)
   } catch (error) {
        console.log("Error in createTask:" ,error.message)
        res.status(500).json({message:error.message})
   }
})

export const getTasks =  asyncHandler(async(req,res)=>{
    try {
     
        console.log("Got tasks........");
        
        const task = await Task.find({ user:req.user._id})

        // if(!userId){
        //     res.status(400).json({message:"User not found"})
        // }
        res.status(201).json({
           task

        })
    } catch (error) {
        console.log("Error in getTask:" ,error.message)
        res.status(500).json({message:error.message})
    }
})


// export const getTask = asyncHandler(async(req,res)=>{
//     try {
//         const userId = req.user._id;

//         const{id} = req.params;
//         if(id === "undefined"){
//             res.status(400).json({message:"Please provide a task"})
//         }

//         const task = await Task.findById(id);
//         if(!task){
//             res.status(400).json({message:"Task not found"})
//         }

//         if(!task.user.equals(userId)){
//             res.status(401).json({message:"Not authorized to view this task"})
//         }

//         res.status(200).json(task)
//     } catch (error) {
//         console.log("Error in getTask:" ,error.message)
//         res.status(500).json({message:error.message})
//     }
// })

export const UpdateTask = asyncHandler(async(req,res)=>{
  const { id: taskId } = req.params;
  const { title, description, dueDate, status } = req.body;
  console.log("Received task ID and data:", taskId, { title, description, dueDate, status });
  
  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { title, description, dueDate, status },
    { new: true }
  );
  
  if (!updatedTask) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  res.json(updatedTask);
})

export const DeleteTask = asyncHandler(async(req,res)=>{
    try {
        // const userId = req.user._id;

        const {id} = req.params;
        console.log(id)
      
        const task = await Task.findById(id);

        if(!task){
            res.status(404).json({message:"task not found"})
        }

        // if(!task.user.equals(userId)){
        //     res.status(404).json({message:"Not authorized"})
        // }

        await Task.findByIdAndDelete(id);
        res.status(200).json({deletedId: id})

    } catch (error) {
        console.log("Error in deleteTask:",error.message);
        res.status(500).json({message:error.message})
    }
})