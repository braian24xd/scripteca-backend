const express = require('express')
const { getRegister, addRegister } = require('../controllers/preregisterController')

const router = express.Router()

router.get("/", getRegister)
router.post("/", addRegister)

module.exports = router