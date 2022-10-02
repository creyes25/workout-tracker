import { application, Router } from 'express'
import * as workoutsCtrl from '../controllers/workouts.js'

const router = Router()

// GET /workouts/new -- create a new workout
router.get('/new', workoutsCtrl.new)

export {
  router
}
