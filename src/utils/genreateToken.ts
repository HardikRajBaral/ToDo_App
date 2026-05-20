import jwt from "jsonwebtoken";
import userModel from "../user/userModel";

const generateToken = {
  generateAccessToken: async (userId: string, email: string) => {
    const user = await userModel.findOne({ _id: userId });
    if (!user || !user.refreshToken) {
      throw new Error("Refresh token not found");
    }
    const userRefreshToken = jwt.verify(
      user.refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
    ) as jwt.JwtPayload;
    if (userRefreshToken.sub !== userId) {
      throw new Error("Invalid refresh token");
    }
    const accessToken = jwt.sign(
      { sub: userId, email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" },
    );
    return accessToken;
  },
  generateRefreshToken: async (userId: string, email: string) => {
    const haveToken = await userModel.findOne({ _id: userId });
    if (haveToken && haveToken.refreshToken) {
      return haveToken.refreshToken;
    } else {
      const refreshToken = jwt.sign(
        { sub: userId, email },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: "15m" },
      )
      if (!refreshToken) {
        throw new Error("Refresh token is not created");
      }
      return refreshToken;
    }
  },
};

export default generateToken;
