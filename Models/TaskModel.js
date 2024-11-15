import mongoose, { mongo } from "mongoose";

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:"No description",
    },
    dueDate:{
        type:Date,
        default:Date.now(),
    },
    status:{
        type:String,
        enum:["pending","completed","in-progress"],
        default:"active"
    },

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true,
    },

},{
    timestamps:true
})

const Task = mongoose.model("Task",TaskSchema)

export default Task