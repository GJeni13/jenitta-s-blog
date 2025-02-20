import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const authHeader =req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(errorHandler(401, "Unauthorized"));
  }
  const data = JSON.parse(atob(authHeader.split(" ")[1]))
  data.id = data._id;
  delete data['_id'];
  const token = jwt.sign(data, process.env.JWT_SECRET);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(401, "Unauthorized"));
    req.user = user; // Attach user object to request
    next();
  });
};
