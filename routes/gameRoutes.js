const { Router } = require("express")
const gameControllers = require("../controllers/gameControllers")
const router = Router()

router.get("/", gameControllers.sendIndexFile)

module.exports = router