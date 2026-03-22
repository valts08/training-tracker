import express from 'express';
import Workouts from './workouts/workouts.model.ts';
import Users from './users/users.model.ts';
import _ from 'lodash';

const app = express();

let workouts = [

  // Workout 1
  {
    id: 1,
    author_id: "89035u9t83u45t209iusd09fg",
    title: "Upper Body Strength",
    category: "Strength",
    duration_minutes: 50,
    difficulty: "Intermediate",
    exercise_count: 5,
    rest_between_sets_seconds: 60,
    equipment: ["barbell", "dumbbells", "cable machine", "pull-up bar"],
    exercises: [
      { id: 1, name: "Barbell Bench Press", muscle_group: "Chest", equipment: "barbell", sets: 4, reps: 8, weight_kg: 80, rest_seconds: 90, notes: "Keep elbows at 45 degrees" },
      { id: 2, name: "Pull-Ups", muscle_group: "Back", equipment: "pull-up bar", sets: 3, reps: 10, weight_kg: 0, rest_seconds: 75, notes: "Full hang at bottom, chin over bar at top" },
      { id: 3, name: "Overhead Press", muscle_group: "Shoulders", equipment: "barbell", sets: 4, reps: 6, weight_kg: 55, rest_seconds: 90, notes: "Brace core, avoid lower back arch" },
      { id: 4, name: "Dumbbell Bicep Curl", muscle_group: "Biceps", equipment: "dumbbells", sets: 3, reps: 12, weight_kg: 14, rest_seconds: 60, notes: "Supinate at the top of the curl" },
      { id: 5, name: "Cable Tricep Pushdown", muscle_group: "Triceps", equipment: "cable machine", sets: 3, reps: 15, weight_kg: 20, rest_seconds: 60, notes: "Lock elbows at sides, full extension" }
    ]
  },

  // Workout 2
  {
    id: 2,
    author_id: "10832u4102934iu0ujg01398041",
    title: "Lower Body Power",
    category: "Strength",
    duration_minutes: 55,
    difficulty: "Advanced",
    exercise_count: 5,
    rest_between_sets_seconds: 90,
    equipment: ["barbell", "leg press machine", "dumbbells"],
    exercises: [
      { id: 1, name: "Barbell Back Squat", muscle_group: "Quads", equipment: "barbell", sets: 5, reps: 5, weight_kg: 100, rest_seconds: 120, notes: "Break parallel, knees track over toes" },
      { id: 2, name: "Romanian Deadlift", muscle_group: "Hamstrings", equipment: "barbell", sets: 4, reps: 8, weight_kg: 85, rest_seconds: 90, notes: "Hinge at hips, slight knee bend" },
      { id: 3, name: "Leg Press", muscle_group: "Quads", equipment: "leg press machine", sets: 3, reps: 12, weight_kg: 120, rest_seconds: 75, notes: "Feet shoulder-width, don't lock knees" },
      { id: 4, name: "Dumbbell Walking Lunge", muscle_group: "Glutes", equipment: "dumbbells", sets: 3, reps: 20, weight_kg: 20, rest_seconds: 60, notes: "10 reps per leg, upright torso" },
      { id: 5, name: "Standing Calf Raise", muscle_group: "Calves", equipment: "barbell", sets: 4, reps: 15, weight_kg: 60, rest_seconds: 45, notes: "Full range of motion, pause at top" }
    ]
  },

  // Workout 3
  {
    id: 3,
    author_id: '8ufoi1280394u90192u018u3r9183u0',
    title: "HIIT Cardio Burn",
    category: "Cardio",
    duration_minutes: 30,
    difficulty: "Intermediate",
    exercise_count: 4,
    rest_between_sets_seconds: 30,
    equipment: ["none"],
    exercises: [
      { id: 1, name: "Burpees", muscle_group: "Full Body", equipment: "none", sets: 4, reps: 12, weight_kg: 0, rest_seconds: 30, notes: "Explosive jump at the top" },
      { id: 2, name: "Jump Squats", muscle_group: "Quads", equipment: "none", sets: 4, reps: 15, weight_kg: 0, rest_seconds: 30, notes: "Land softly, absorb impact through hips" },
      { id: 3, name: "Mountain Climbers", muscle_group: "Core", equipment: "none", sets: 4, reps: 30, weight_kg: 0, rest_seconds: 30, notes: "Keep hips level, drive knees fast" },
      { id: 4, name: "Box Jumps", muscle_group: "Glutes", equipment: "none", sets: 3, reps: 10, weight_kg: 0, rest_seconds: 45, notes: "Step down, don't jump down" }
    ]
  }

];

let users = [
  {
    id: 1,
    username: "billybob"
  },
  {
    id: 2,
    username: "valtscoolguy"
  },
  {
    id: 3,
    username: "pacereaper"
  }
]

app.use(express.json())

// WORKOUT ROUTES START

app.get('/workouts', (req, res, next) => {
    res.status(200).send({ workouts: workouts, message: "All available workouts" })
})

app.post('/workout', (req, res, next) => {

    if (!req.body || typeof req.body !== "object") {
        res.status(400).send({ message: "Unexpected data type for request body" })
    }

    const objectExists = workouts.some((workout: object) => _.isEqual(workout, req.body))

    if (objectExists) {
        res.status(409).send({ message: "Workout already exists in the database, change it up!" })
    }

    workouts.push(req.body)
    
    res.status(200).send({ workout: req.body, message: "Workout added to the list!" })
})

app.delete('/workout/:id/delete', (req, res, next) => {

    const requestId: number = parseInt(req.params.id)

    const deleteId = workouts.findIndex((workout: Workouts) => {
        return workout.id === requestId
    })

    if (deleteId == -1) {
        res.status(400).send({ message: `Workout ${requestId} not found` })
    }
    const newShallowObj = workouts.toSpliced(deleteId, 1)

    res.status(200).send({ workouts: newShallowObj, message: `Workout ${requestId} successfully deleted` })
})

// WORKOUT ROUTES END

// USER ROUTES START

app.post('/user', (req, res, next) => {
    
    if (!req.body) {
        res.status(400).send({ message: "No body sent with request" })
    }

    const idExists = users.some(user => user.id === req.body.id)
    const usernameExists = users.some(user => user.username === req.body.username)

    if (idExists) {
        throw new Error("Identifier conflict, can't submit user with already existing ID")
    }

    if (usernameExists) {
        res.status(409).json({ message: "Username already exists" })
    }

    users.push(req.body)

    res.status(200).send({ users, message: "User added successfully" })
    // empty objects can also be added
})

app.put('/user/:id/edit', (req, res, next) => {
    const userId = parseInt(req.params.id)

    let editIndex = users.findIndex((user: any) => user.id === userId)

    if (editIndex == -1) {
        res.status(400).send({ message: `User with id ${userId} not found` })
    }

    users[editIndex] = {
        id: userId,
        username: req.body.username
    }

    res.status(200).send({ users, message: "Username edited successfully" })
})

// USER ROUTES END

app.listen(3000, () => {
    console.log('connected to server on PORT 3000')
})