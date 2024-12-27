import express from 'express'
import { getUser, loginUser, postUsers ,getAllUsers , changeUserType , disableUser , delelteUserByEmail, verifyUserEmail  } from '../controllers/userControllers.js'

const userRouter = express.Router()


userRouter.post("/",postUsers)

userRouter.post("/login",loginUser)

userRouter.get("/",getUser)

userRouter.post("/all",getAllUsers)

userRouter.put("/change-type/:userId",changeUserType)

userRouter.put("/disable/:userId",disableUser)

userRouter.delete("/admin-delete/:email",delelteUserByEmail)


userRouter.post("/verify-email", verifyUserEmail)







export default userRouter;

//test code 

