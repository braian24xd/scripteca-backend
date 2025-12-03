import { Router } from 'express'
import { getModules, createModule } from '../controllers/moduleController.js'

const moduleRouter = Router()

moduleRouter.get('/', getModules)
moduleRouter.post('/', createModule)

export default moduleRouter