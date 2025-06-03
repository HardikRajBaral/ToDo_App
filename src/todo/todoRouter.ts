import express, { NextFunction,Response,Request } from "express"
import { updateTodoMiddleware,createTodoMiddleware } from "../middleware/routerMiddleware"
import Authenticate from "../middleware/Authenticate"
import { listTodo } from "./todoController"


const todoRouter =express.Router()


todoRouter.post('/', Authenticate,  createTodoMiddleware)
todoRouter.patch('/:todoId',Authenticate, updateTodoMiddleware)
todoRouter.get('/',listTodo)
export default todoRouter