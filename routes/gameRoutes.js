const { Router } = require("express")
const gameControllers = require("../controllers/gameControllers")
const router = Router()

router.get("/", gameControllers.sendIndexFile)
router.post("/fraction", gameControllers.getFractionsInfo)

module.exports = router