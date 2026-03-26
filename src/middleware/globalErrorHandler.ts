import { NextFunction, Request, Response, Errback } from 'express';

const globalErrorHandler = (err: Errback, req: Request, res: Response, next: NextFunction) => {
    
    console.log("---------------")
    console.error(err);
    console.log("---------------")
    next();
}

export default globalErrorHandler