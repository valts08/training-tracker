interface ExercisesObject {
    id: number,
    name: string,
    muscle_group: string,
    equipment: string,
    sets: number,
    reps: number,
    weight_kg: number,
    rest_seconds: number,
    notes: string
}

export default interface Workouts {
    id: number,
    author_id: string,
    title: string,
    category: string,
    duration_minutes: number,
    difficulty: string,
    exercise_count: number,
    rest_between_sets_seconds: number,
    equipment: string[],
    exercises: ExercisesObject[]
}