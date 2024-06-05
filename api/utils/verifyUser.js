import jwt from "jsonwebtoken";
import  {errHandler}  from "./error.js";

export const verifyToken = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return next(errHandler(403, 'Token is not provided'));
      }
  
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
          return next(errHandler(403, 'Token is 2not valid'));
        }
     
        req.user = user;
    });
        next();
    } catch (err) {
      next(errHandler(403, 'Token is not valid'));
    }
  };

