import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const authenticate = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    if (!bearer) {
      throw Error;
    }

    const [, token] = bearer.split(" ");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === "object" && decoded.id) {
      const user = await User.findByPk(decoded.id);
      if (!user) {
        throw Error;
      }
      req.user = user;
      next();
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const authorize = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN") {
      throw Error;
    }
    next();
  } catch (error) {
    return res.sendStatus(500);
  }
};
