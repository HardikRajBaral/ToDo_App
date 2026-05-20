import { NextFunction, Request, Response } from "express";
import todoModel from "./todoModel";

const allowedFields =["title","createdAt","duedate"]
const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, duedate } = req.body;
   
    const newtodo = await todoModel.create({
      userName: req.userId,

      title,

      description,

      duedate,
    });

    return res.status(200).json({ id: newtodo._id });
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, duedate } = req.body;
  if (!title || !description || !duedate) {
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

  if (todo.userName.toString() !== req.userId) {
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
      duedate,
    },
    {
      new: true,
    },
  );
  res.json(updatedTodo);
};

const listTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortBy = req.query.sortBy as string || "createdAt";
    const sortfield= allowedFields.includes(sortBy)? sortBy :"createdAt"
    const skip = (page - 1) * limit;
    const order= req.query.order ==='asc' ? 1 : -1;
    const list = await todoModel
      .find({ userName: req.userId })
      .skip(skip)
      .limit(limit)
      .sort({ [sortfield]: order });
    const total = await todoModel.countDocuments({ userName: req.userId });
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
    const todo = await todoModel.findOne({ userName: req.userId, _id: id });
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todoId = req.params.todoId;
    const todo = await todoModel.findOne({ _id: todoId });
    if (!todo) {
      return res.status(400).json({ message: "Todo does not exist" });
    }
    
    if (todo.userName.toString() !== req.userId) {
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
