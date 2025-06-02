import express from "express"
import { createTodo } from "./todoController"


const todoRouter =express.Router()

todoRouter.post('/',createTodo)