import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as workoutsCtrl from '../controllers/workouts.js'


const router = Router()

// GET /workouts/new -- create a new workout -- (isloggedin)
router.get('/new', workoutsCtrl.new)

// GET - /workouts -- view all workouts 
router.get('/', workoutsCtrl.index)

//GET - /workouts/:id -- view details of individual workout ()
router.get('/:id', workoutsCtrl.show)

// GET - /workouts/:id/edit
router.get('/:id/edit', workoutsCtrl.edit)

// GET - /workouts/:workoutId/exercises/exerciseId/newset
router.get('/:workoutId/exercises/:exerciseId/newset', workoutsCtrl.newSet)

// POST - /workouts -- post the new workout into database ()
router.post('/', workoutsCtrl.create)

// POST - /workouts/:id/exercises
router.post('/:id/exercises', workoutsCtrl.createExercise)

// POST - / 
router.post('/:workoutId/exercises/:exerciseId/create', workoutsCtrl.createSet)

// PUT - /workouts/:id
router.put('/:id', workoutsCtrl.update)

// DELETE - /workouts/:id -- delete a workout
router.delete('/:id', workoutsCtrl.delete)

export {
  router
}
