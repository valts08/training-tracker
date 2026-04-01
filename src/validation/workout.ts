import z from 'zod'

const Exercises = z.object({
  id: z.number(),
  name: z.string(),
  muscle_group: z.string(),
  equipment: z.string(),
  sets: z.number().min(1),
  reps: z.number().min(1),
  weight_kg: z.number(),
  rest_seconds: z.number().min(1),
  notes: z.string()
})

const WorkoutVal = z.object({
  id: z.number(),
  author_id: z.string().min(15),
  title: z.string().min(10),
  category: z.string(),
  duration_minutes: z.number().min(1),
  difficulty: z.string(),
  exercise_count: z.number().min(1),
  rest_between_sets_seconds: z.number().min(30),
  equipment: z.array(z.string()),
  exercises: z.array(Exercises)
})

export type Workout = z.infer<typeof WorkoutVal>

export { WorkoutVal }