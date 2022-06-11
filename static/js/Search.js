import { UserContext } from "./UserContext.js"

export class Search {
    constructor () {
        this.mainDiv = document.getElementById("main")
        this.userContext = JSON.parse(sessionStorage.getItem("UserContext"))
        this.validateUser()
    }

    validateUser = async () => {
        if (!this.userContext) {
            return window.location.href = "/"
        }
        await this.resetGameCookies()
        this.estabilishSocket()
    }

    estabilishSocket = () => {
        const socket = io.connect("http://localhost:3001");

        socket.emit("find-opponent", {context: this.userContext});
        socket.on("pair-with-opponent", (data) => this.pairWithOpponent(data))
        
        this.showSearchingMenu()
        
    }

    pairWithOpponent = async (socketData) => {
        console.log(socketData)
        this.loaderContainer.style.display = "none"
        this.informationContainer.innerHTML = ""
        this.socketRoom = socketData.socketRoom
        const usersArr = Object.values(socketData).slice(0, 2)
        this.usersArr = usersArr

         // _-_-_- set user cookies, to join game (without them it is impossible) _-_-_-
        this.setGameCookies()

        // ----- render user iformations -----

        usersArr.forEach((user) => {
            console.log(this.userContext)
            const name = this.userContext.userName === user.userName ? user.userName + " (You)" : user.userName
            this.createUserInformations(name, user.fraction.name)
        })

        const fightInfo = document.createElement("p")
        fightInfo.classList.add("fight-info")
        fightInfo.innerText = "The battle beginns at: "
        const fightTimer = document.createElement("p")
        fightTimer.classList.add("fight-timer")
        this.informationContainer.appendChild(fightInfo)
        this.informationContainer.appendChild(fightTimer)

       
        let decrementer = 10
        const countInterval = setInterval(() => {
            fightTimer.innerText = decrementer + ""
            decrementer--
        }, 1000)
        const startGameTimeout = setTimeout(() => {
            clearInterval(countInterval)
            fightTimer.innerText = ""
            window.location.href = "/play"
        }, 11000)
    }

    showSearchingMenu = () => {
        console.log(this.userContext.fraction.name)
        const informations = document.createElement("div")
        informations.setAttribute("id", "information-container")
        this.informationContainer = informations
        this.usersContainer = this.informationContainer
        this.createUserInformations(this.userContext.userName, this.userContext.fraction.name)
       

        const loaderContainer = document.createElement("div")
        this.loaderContainer = loaderContainer
        loaderContainer.classList.add("loader-container")
        const loaderText = document.createElement("p")
        loaderText.innerText = "Waiting for opponent..."
        const loader = document.createElement("img")
        loader.src = "/imgs/loading-circle.gif"

        loaderContainer.appendChild(loaderText)
        loaderContainer.appendChild(loader)

        informations.appendChild(loaderContainer)
        this.mainDiv.appendChild(informations)
        
    }

    createUserInformations = (name, fractionName) => {
        const userContainer = document.createElement("div")
        userContainer.classList.add("userContainer")

        const userName = document.createElement('h2')
        userName.innerText = name

        let liderImg = document.createElement("img")
        liderImg.src = this.getLiderImg(fractionName)

        const fraction = document.createElement("h4")
        fraction.innerText = fractionName


        userContainer.appendChild(userName)
        userContainer.appendChild(liderImg)
        userContainer.appendChild(fraction)
        this.informationContainer.appendChild(userContainer)
    }
    getLiderImg = (liderImg) => {
        switch(liderImg) {
            case "Humans":
                return "/imgs/liders/human-king.png"
            case "Demons":
                return '/imgs/liders/demons-king.png'
            case "Undeads":
                return "/imgs/liders/undeads-king.png"
        }
    }

    setGameCookies = () => {
        return new Promise(async (resolve, reject) =>{
            try {
                const cookieRes = await fetch("/set/game/cookies", {
                    method: "POST",
                     credentials: "include",
                     body: JSON.stringify({roomId: this.socketRoom})
                    
                })
                // const cookieData = await cookieRes.json()
                resolve({msg: "Success"})
            } catch (err) {
                reject({err})
            }   
          
        })
    }

    resetGameCookies = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch("/reset/game/cookies", {
                    method: "POST",
                    credentials: "include"
                })
                // const resData = await res.json()
                resolve({msg: "Success"})
            } catch (err) {
                reject({err})
            }
        })
    }
}