import express, { NextFunction,Response,Request } from "express"
import { updateTodoMiddleware,createTodoMiddleware } from "../middleware/routerMiddleware"
import Authenticate from "../middleware/Authenticate"


const todoRouter =express.Router()


todoRouter.post('/', Authenticate,  createTodoMiddleware)
todoRouter.patch('/:todoId',Authenticate, updateTodoMiddleware)
export default todoRouter