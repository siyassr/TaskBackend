import express from "express"
const router = express.Router()
import {CreateTask, getTasks, UpdateTask, DeleteTask, } from "../Controller/TaskController.js"
import  Protect  from "../Middleware/AuthMiddleware.js" 

router.post("/task",Protect,CreateTask)
router.get("/task",Protect,getTasks)
// router.get("/task/:id",Protect,getTask)
router.put("/task/:id",Protect,UpdateTask)
router.delete("/task/:id",Protect,DeleteTask)

export default router