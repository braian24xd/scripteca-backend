import { Router } from 'express'
import { getRegister, addRegister } from '../controllers/preregisterController.js'

const preregisterRouter = Router()

preregisterRouter.get("/", getRegister)
preregisterRouter.post("/", addRegister)

export default preregisterRouter