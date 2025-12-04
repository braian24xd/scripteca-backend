import Payment from '../models/Payment.js'

const getPayments = (reqy, res) => {
    try {
        const payments = Payment.find()
        return res.status(200).json({ data: payments })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Error interno, intenta de nuevo más tarde" })
    }
}



export {
    getPayments
}