import { Workout } from "../models/wokout.js"

function newWorkout(req, res) {
  res.render('workouts/new',{
    title: 'Add a Workout'
  })
}

export {
  newWorkout as new
}