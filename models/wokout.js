import mongoose from 'mongoose'

const Schema = mongoose.Schema

const setSchema = new Schema({
  setNum: Number,
  reps: Number,
  weight: Number
})



const exerciseSchema = new Schema({
  activity: String,
  target: String,
  sets: [setSchema]
})


const workoutSchema = new Schema({
  workoutDate: Date,
  difficulty: {
    type: Number,
    min: 1,
    max: 5,
  },
  duration: Number,
  exercises: [exerciseSchema],
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
}, {
  timestamps: true,
})

const Workout = mongoose.model('Workout', workoutSchema)

export {
  Workout
}