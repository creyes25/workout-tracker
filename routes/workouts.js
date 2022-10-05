import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as workoutsCtrl from '../controllers/workouts.js'


const router = Router()

// GET /workouts/new -- create a new workout -- (isloggedin)
router.get('/new', isLoggedIn, workoutsCtrl.new)

// GET - /workouts -- view all workouts 
router.get('/', isLoggedIn, workoutsCtrl.index)

//GET - /workouts/:id -- view details of individual workout ()
router.get('/:id', isLoggedIn, workoutsCtrl.show)

// GET - /workouts/:id/edit
router.get('/:id/edit', isLoggedIn, workoutsCtrl.edit)

// GET - /workouts/:workoutId/exercises/:exerciseId/newset
router.get('/:workoutId/exercises/:exerciseId/newset', isLoggedIn, workoutsCtrl.newSet)

// GET - /workouts/:workoutId/exercises/:exerciseId -- get details on certain exercise
router.get('/:workoutId/exercises/:exerciseId',  isLoggedIn, workoutsCtrl.showExercise)

// POST - /workouts -- post the new workout into database ()
router.post('/', isLoggedIn, workoutsCtrl.create)

// POST - /workouts/:id/exercises -- post new exercise into the workout
router.post('/:id/exercises', isLoggedIn, workoutsCtrl.createExercise)

// POST - /workouts/:workoutId/exercises/:exerciseId/create -- post a new set into an exercise
router.post('/:workoutId/exercises/:exerciseId/create', isLoggedIn,  workoutsCtrl.createSet)

// PUT - /workouts/:id  -- update workout
router.put('/:id', isLoggedIn, workoutsCtrl.update)

// DELETE - /workouts/:id -- delete a workout
router.delete('/:id', isLoggedIn, workoutsCtrl.delete)

export {
  router
}
