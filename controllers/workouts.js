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
    res.redirect(`/workouts`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function index(req, res) {
  Workout.find({owner: req.user.profile._id})
  .then(workouts => {
    res.render('workouts/index', {
    workouts,
    title: 'Workouts',
  })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


function showWorkout(req, res) {
  Workout.findById(req.params.id)
  .then(workout => {
    let workoutDt = workout.workoutDate.toDateString()
    if (workout.owner.equals(req.user.profile._id)){
      res.render('workouts/show', {
        title: 'Workout Details',
        workout,
        workoutDt,
        hours : Math.floor(workout.duration / 60),
        mins : workout.duration % 60
      })
    }else {
      throw new Error('NOT AUTHORIZED')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteWorkout(req, res) {
  Workout.findByIdAndDelete(req.params.id)
  .then(workout => {
    res.redirect('/workouts')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function editWorkout(req, res) {
  Workout.findById(req.params.id)
  .then(workout => {
    res.render('workouts/edit', {
      title: 'Edit Workout',
      workout
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function updateWorkout(req, res) {
  Workout.findById(req.params.id)
  .then(workout => {
    if (workout.owner.equals(req.user.profile._id)){
      workout.update(req.body, {new: true})
      .then(updateWorkout => {
        res.redirect(`/workouts/${workout._id}`)
      })
    } else {
      throw new Error('NOT AUTHORIZED')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function createExercise(req, res) {
  Workout.findById(req.params.id)
  .then(workout => {
    workout.exercises.push(req.body)
    workout.save()
    .then(() => {
      res.redirect(`/workouts/${workout._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/workouts')
  })
}

function newSet(req, res) {
  Workout.findById(req.params.workoutId)
  .then(workout => {
    if (workout.owner.equals(req.user.profile._id)){
      res.render('sets/new', {
        title: 'Add new set',
        workout: workout,
        exercise: workout.exercises.id(req.params.exerciseId)
      })
    }else {
      throw new Error('NOT AUTHORIZED')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function createSet(req, res) {
  Workout.findById(req.params.workoutId)
  .then(workout => {
    if (workout.owner.equals(req.user.profile._id)){
      const exercise = workout.exercises.id(req.params.exerciseId)
      exercise.sets.push(req.body)
      workout.save()
      .then (() => {
        res.redirect(`/workouts/${workout._id}`)
      })
    }else {
      throw new Error('NOT AUTHORIZED')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function showExercise(req, res) {
  Workout.findById(req.params.workoutId)
  .then(workout => {
    if (workout.owner.equals(req.user.profile._id)){
      res.render('exercises/show', {
        title: 'Exercise Details' ,
        exercise: workout.exercises.id(req.params.exerciseId),
        workout,
      })
    }else {
      throw new Error('NOT AUTHORIZED')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  newWorkout as new,
  createWorkout as create,
  index,
  showWorkout as show,
  deleteWorkout as delete,
  editWorkout as edit,
  updateWorkout as update,
  createExercise,
  newSet,
  createSet,
  showExercise
}