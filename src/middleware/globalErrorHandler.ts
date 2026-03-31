import { NextFunction, Request, Response, Errback } from 'express';
import { ZodError } from 'zod'

const globalErrorHandler = (err: Errback, req: Request, res: Response, next: NextFunction) => {
    
    let errors;
    console.log("---------------")
    if (err instanceof ZodError) {
            errors = err.issues.map(i => ({
            field: i.path.join('.'),
            message: i.message
        }))

        console.log(errors)
        console.log("---------------")

        return res.status(400).json({ errors })
    }
    console.log(err)
    console.log("---------------")
    next();
}

export default globalErrorHandler