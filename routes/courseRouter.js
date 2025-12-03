import { Router } from 'express'
import { getCourses, createCourse } from '../controllers/courseController.js'

const courseRouter = Router()

courseRouter.get("/", getCourses)
courseRouter.post("/", createCourse)

export default courseRouter