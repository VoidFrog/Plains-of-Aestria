const userHelpers = require("../helpers/userHelpers")
const path = require("path")
const Fraction = require("../models/Fraction")

const sendIndexFile = async (req, res) => {
    console.log("jest")
    const { jwt } = req.cookies
    const user = await userHelpers.verifyUser(jwt)
    console.log(user)
    if (user.err) {
        return res.redirect("/login")
    }
    
    return res.sendFile(path.resolve("static/pages/home.html"))
}

const getFractionsInfo = async (req, res) => {
    try {
        const fractions = await Fraction.find()
        return res.send(fractions)
    } catch(err) {
        console.log(err)
    }

}

module.exports = {sendIndexFile, getFractionsInfo}