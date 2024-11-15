import express from "express"
const router = express.Router()
import {LoginUser, logOut, RegistreUser} from "../Controller/UserController.js"
// import { logout } from "../../frontend/src/Redux/UserSlice.jsx"

router.post("/signup",RegistreUser)
router.post("/",LoginUser)
router.post("/logout",logOut)

export default router