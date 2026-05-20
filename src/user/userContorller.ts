import bcrypt from "bcrypt";
import type { NextFunction, Request, Response } from "express";
import generateToken from "../utils/genreateToken";
import userModel from "./userModel";
import jwt from "jsonwebtoken";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
  } catch (error) {
    next(error);
  }
  const hassedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await userModel.create({
      userName,
      email,
      password: hassedPassword,
    });

    const updateUser = await userModel.findOne({
      _id: newUser._id,
    });
    if (!updateUser) return res.status(400).json({ message: "User not found" });

    const refreshToken = await generateToken.generateRefreshToken(
      String(updateUser._id),
      email,
    );
     await userModel.findOneAndUpdate(
      {
        _id: newUser._id,
      },
      {
        refreshToken: refreshToken,
      },
    );
    const token = await generateToken.generateAccessToken(
      String(updateUser._id),
      email,
    );

    res.status(200).json({ accessToken: token });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    let newRefToken = user.refreshToken;
    try {
      const decodedToken = jwt.verify(
        newRefToken as string,
        process.env.REFRESH_TOKEN_SECRET as string,
      ) as jwt.JwtPayload;

      if (decodedToken.sub != String(user._id)) {
        throw new Error("Invalid refresh token");
      }
      const token = await generateToken.generateAccessToken(
        String(user._id),
        email,
      );
      return res.status(200).json({ accessToken: token });
    } catch (error) {
      newRefToken = await generateToken.generateRefreshToken(
        String(user._id),
        email,
      );
      await userModel.findOneAndUpdate(
        {
          _id: user._id,
        },
        {
          refreshToken: newRefToken,
        },
      );
      const token = await generateToken.generateAccessToken(
        String(user._id),
        email,
      );
      return res.status(200).json({ accessToken: token });
    }
  } catch (error) {
    next(error);
  }
};
export { createUser, loginUser };
