const { Router } = require("express")
const gameControllers = require("../controllers/gameControllers")
const router = Router()

router.get("/play", gameControllers.sendGameFile)


module.exports = router