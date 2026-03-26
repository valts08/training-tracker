import { NextFunction, Request, Response } from 'express';

const unknownRouteHandler = (req: Request, res: Response, next: NextFunction) => {
    
    console.log("you didn't match any of the other routes, congrats!")
    next();
}

export default unknownRouteHandler