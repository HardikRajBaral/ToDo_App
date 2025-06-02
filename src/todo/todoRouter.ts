import express, { NextFunction,Response,Request } from "express"
import { createTodoMiddleware } from "../middleware/routerMiddleware"

const todoRouter =express.Router()


todoRouter.post('/',createTodoMiddleware)