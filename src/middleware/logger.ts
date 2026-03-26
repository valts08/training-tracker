import { NextFunction, Response, Request } from 'express'

const routeLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = process.hrtime.bigint();

    res.on('finish', () => {
        const duration = Number(process.hrtime.bigint() - start) / 1_000_000;
        console.log(`[${req.method}] ${req.originalUrl} — ${duration.toFixed(2)}ms — ${res.statusCode}`);
    });
    next();
}

export default routeLogger