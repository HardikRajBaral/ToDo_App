import express, { NextFunction,Response,Request } from "express"
import { updateTodoMiddleware,createTodoMiddleware,deleteTodoMiddleware, singleTodoMiddleware } from "../middleware/routerMiddleware"
import Authenticate from "../middleware/Authenticate"
import { listTodo } from "./todoController"


const todoRouter =express.Router()


todoRouter.post('/', Authenticate,  createTodoMiddleware)
todoRouter.patch('/:todoId',Authenticate, updateTodoMiddleware)
todoRouter.get('/:userId',Authenticate,listTodo)
todoRouter.get("/:todoId",Authenticate,singleTodoMiddleware)
todoRouter.delete('/:todoId',Authenticate,deleteTodoMiddleware)
export default todoRouter