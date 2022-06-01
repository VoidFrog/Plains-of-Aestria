const userHelpers = require("../helpers/userHelpers")
const path = require("path")

const sendIndexFile = async (req, res) => {
    console.log("jest")
    const { jwt } = req.cookies
    const user = await userHelpers.verifyUser(jwt)
    console.log(user)
    if (user.err) {
        return res.redirect("/login")
    }
    
    return res.sendFile(path.resolve("static/pages/index.html"))

}

module.exports = {sendIndexFile}