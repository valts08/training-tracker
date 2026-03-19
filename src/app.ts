import express from 'express';
import workoutObject from './utils.ts';
import Workouts from './workouts/workouts.model.ts';
import _ from 'lodash';

const app = express();

app.use(express.json())

app.get('/workouts', (req, res, next) => {
    res.status(200).send({ workouts: workoutObject, message: "All available workouts" })
})

app.post('/workout', (req, res, next) => {

    if (typeof req.body !== "object") {
        res.status(400).send({ message: "Unexpected data type for request body" })
    }

    const objectExists = workoutObject.some((workout: object) => _.isEqual(workout, req.body))

    if (objectExists) {
        res.status(409).send({ message: "Workout already exists in the database, change it up!" })
    }

    workoutObject.push(req.body)
    
    res.status(200).send({ workout: req.body, message: "Workout added to the list!" })
})

app.delete('/workout/:id/delete', (req, res, next) => {

    const requestId: number = parseInt(req.params.id)

    const deleteId = workoutObject.findIndex((workout: Workouts) => {
        return workout.id === requestId
    })

    if (deleteId == -1) {
        res.status(400).send({ message: `Workout ${requestId} not found` })
    }
    const newShallowObj = workoutObject.toSpliced(deleteId, 1)

    res.status(200).send({ workouts: newShallowObj, message: `Workout ${requestId} successfully deleted` })
})

app.listen(3000, () => {
    console.log('connected to server on PORT 3000')
})