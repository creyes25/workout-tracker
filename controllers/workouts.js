import { Workout } from "../models/wokout.js"

function newWorkout(req, res) {
  res.render('workouts/new',{
    title: 'Add a Workout'
  })
}

function createWorkout(req, res) {
  req.body.owner = req.user.profile._id
  Workout.create(req.body)
  .then(workout => {
    res.redirect(`/workouts/new`)
  })
}

function index(req, res) {
  Workout.find({})
  .then(workouts => {
    res.render('workouts/index', {
      workouts,
      title: 'Workouts',

    })
  })
}

function showWorkout(req, res) {
  Workout.findById(req.params.id)
  .then(workout => {
    res.render('workouts/show', {
      title: 'Workout Details',
      workout
    })
  })
}

function deleteWorkout(req, res) {
  Workout.findByIdAndDelete(req.params.id)
  .then(workout => {
    res.redirect('/workouts')
  })
}

export {
  newWorkout as new,
  createWorkout as create,
  index,
  showWorkout as show,
  deleteWorkout as delete,

}