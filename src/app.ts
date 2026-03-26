import express from 'express';
import workoutRouter from './routes/workouts'
import userRouter from './routes/users'
import routeLogger from './middleware/logger';
import globalErrorHandler from './middleware/globalErrorHandler';
import unknownRouteHandler from './middleware/unknownRouteHandler';

const app = express();

app.use(express.json())

app.use(routeLogger)

app.use('/workout', workoutRouter)
app.use('/user', userRouter)

app.use(globalErrorHandler)
app.use(unknownRouteHandler)

app.listen(3000, () => {
    console.log('connected to server on PORT 3000')
})