import express from 'express';
import workoutRouter from './routes/workouts'
import userRouter from './routes/users'

const app = express();

app.use(express.json())

app.use('/workout', workoutRouter)
app.use('/user', userRouter)

app.listen(3000, () => {
    console.log('connected to server on PORT 3000')
})