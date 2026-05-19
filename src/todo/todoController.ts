import { NextFunction, Request, Response } from "express";
import todoModel from "./todoModel";

const allowedFields =["title","createdAt","Duedate"]
import { AuthernticatedRequest } from "../middleware/Authenticate";
const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, Duedate } = req.body;
    const _req = req as AuthernticatedRequest;
    const newtodo = await todoModel.create({
      userName: _req.userId,

      title,

      description,

      Duedate,
    });

    return res.status(200).json({ id: newtodo._id });
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, Duedate } = req.body;
  if (!title || !description || !Duedate) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const todoId = req.params.todoId;

  if (!todoId) {
    return res.status(400).json({ message: "Todo ID is required" });
  }
  const todo = await todoModel.findOne({ _id: todoId });
  if (!todo) {
    return res.status(400).json({ message: "Todo does not exist" });
  }

  const _req = req as AuthernticatedRequest;
  if (todo.userName.toString() !== _req.userId) {
    return res
      .status(400)
      .json({ message: "You are not authorized to update this todo" });
  }

  const updatedTodo = await todoModel.findOneAndUpdate(
    {
      _id: todoId,
    },
    {
      title,
      description,
      Duedate,
    },
    {
      new: true,
    },
  );
  res.json(updatedTodo);
};

const listTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _req = req as AuthernticatedRequest;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortBy = req.query.sortBy as string || "createdAt";
    const sortfield= allowedFields.includes(sortBy)? sortBy :"createdAt"
    const skip = (page - 1) * limit;
    const list = await todoModel
      .find({ userName: _req.userId })
      .skip(skip)
      .limit(limit)
      .sort({ [sortfield]: 1 });
    const total = await todoModel.countDocuments({ userName: _req.userId });
    res.json({
      list,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    next(error);
  }
};

const singleTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.todoId;
    const _req = req as AuthernticatedRequest;
    const todo = await todoModel.findOne({ userName: _req.userId, _id: id });
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todoId = req.params.todoID;
    const todo = await todoModel.findOne({ _id: todoId });
    if (!todo) {
      return res.status(400).json({ message: "Todo does not exist" });
    }
    const _req = req as AuthernticatedRequest;
    if (todo.userName.toString() !== _req.userId) {
      return res
        .status(400)
        .json({ message: "You are not authorized to delete this todo" });
    }
    await todoModel.deleteOne({ _id: todoId });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { createTodo, updateTodo, listTodo, deleteTodo, singleTodo };
