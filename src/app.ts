import express from 'express';
import workoutRouter from './routes/workouts';
import userRouter from './routes/users';
import routeLogger from './middleware/logger';
import globalErrorHandler from './middleware/globalErrorHandler';
import unknownRouteHandler from './middleware/unknownRouteHandler';
import cors from 'cors';
import helmet from 'helmet';
import config from './config/index'

const app = express();
app.use(express.json())

app.use(cors({
  "origin": "*",
  "methods": "GET,PUT,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))
app.use(helmet())

app.use(routeLogger)

app.use('/workout', workoutRouter)
app.use('/user', userRouter)

app.use(globalErrorHandler)
app.use(unknownRouteHandler)

app.listen(config.PORT, () => {
    console.log('connected to server on PORT 3000')
})