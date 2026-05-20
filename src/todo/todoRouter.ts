import express, { NextFunction,Response,Request } from "express"
import { updateTodoMiddleware,createTodoMiddleware,deleteTodoMiddleware, singleTodoMiddleware } from "../middleware/routerMiddleware"
import Authenticate from "../middleware/Authenticate"
import { listTodo } from "./todoController"
import {apiRateLimiter} from "../utils/apiRateLimiter"


const todoRouter =express.Router()


todoRouter.post('/', Authenticate,  apiRateLimiter,createTodoMiddleware)
todoRouter.patch('/:todoId',Authenticate,apiRateLimiter, updateTodoMiddleware)
todoRouter.get('/:userId',Authenticate,apiRateLimiter,listTodo)
todoRouter.get("/:todoId",Authenticate,apiRateLimiter,singleTodoMiddleware)
todoRouter.delete('/:todoId',Authenticate,apiRateLimiter,deleteTodoMiddleware)
export default todoRouter