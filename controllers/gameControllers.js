const userHelpers = require("../helpers/userHelpers")
const path = require("path")

const sendGameFile = async (req, res) => {
    const { jwt, roomId } = req.cookies
    const user = await userHelpers.verifyUser(jwt)
    // console.log(user)
    if (user.err) {
        return res.redirect("/login")
    }

    if (!roomId) {
        return res.redirect("/")
    }
    
    return res.sendFile(path.resolve("static/pages/index.html"))

}

module.exports = {sendGameFile}