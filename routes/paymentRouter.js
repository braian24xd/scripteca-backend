import { Router } from 'express'
import { getPayments } from '../controllers/paymentController.js'

const paymentRouter = Router()

paymentRouter.get('/', getPayments)

export default paymentRouter