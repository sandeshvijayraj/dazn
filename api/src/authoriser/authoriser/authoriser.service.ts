// jwt.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const secretKey = 'secretmanager'; // Replace with your actual secret key

    // Check if the request header contains the 'Authorization' header
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - Missing Authorization header' });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    // Verify and decode the JWT
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({ message: 'Unauthorized - Invalid token' });
      }

      // Attach the decoded user information to the request object for further processing
      req.headers['user'] = decoded;

      // Call the next middleware or route handler
      next();
    });
  }
}
