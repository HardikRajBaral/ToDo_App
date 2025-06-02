import express, { NextFunction,Response,Request } from "express"
import { createTodoMiddleware } from "../middleware/routerMiddleware"
import Authenticate from "../middleware/Authenticate"
import { createTodo } from "./todoController"

const todoRouter =express.Router()


todoRouter.post('/', Authenticate,  createTodoMiddleware)
export default todoRouter