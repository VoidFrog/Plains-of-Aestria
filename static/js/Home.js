import { UserContext } from "./UserContext.js";


export class Home {
    
    constructor() {
        this.userData;
        this.fractionData;
        this.userChoosenFractionP;
        this.deckShowed = false
        this.socketEstabilished = false
        this.mainDiv = document.getElementById("main")
        this.deckDiv = document.getElementsByClassName('deck')[0]
        this.insertDiv = document.getElementsByClassName("user-info")[0]
        this.userDiv = document.getElementsByClassName("user")[0]
        this.init()
    }

    init = async () => {
         // TODO: Dodaj kreciola
        if (this.userData) {
            return this.createUserInfo(this.userData)
        }
       
        try {
            const res = await fetch('/user', {
                method: "POST",
                credentials: "include"
            })
            const resData = await res.json()
            this.userData = resData
            // console.log(this.userData)
            this.createUserInfo(resData)
        } catch (err) {

        }
    }

    createUserInfo = (userInfo) => {
        // TODO: usun kreciola
        const userName = document.createElement("h2")
        userName.innerText = "Welcome " + userInfo.name + "!"
        userName.classList.add("user-name")

        const userEmail = document.createElement('p')
        userEmail.innerHTML = "<i class='material-icons'>email</i> " + userInfo.email
        userEmail.classList.add("user-email")

        const pickFractionBtn = document.createElement("button")
        pickFractionBtn.innerText = "Choose your fraction"
        pickFractionBtn.setAttribute("id", "pick-fraction-btn")
        pickFractionBtn.classList.add("button")
        pickFractionBtn.onclick = () => this.showFractionMenu()

        const userChoosenFraction = document.createElement("p")
        userChoosenFraction.innerText = "Choosen fraction: none"
        this.userChoosenFractionP = userChoosenFraction

        // --- start game button ---
        const startGameButton = document.createElement("button")
        startGameButton.setAttribute("disabled", "true")
        startGameButton.innerText = "START GAME"
        startGameButton.classList.add("button")
        startGameButton.onclick = () => this.showSearchForGameMenu()
        this.startGameButton = startGameButton

        this.userDiv.appendChild(userName)
        this.userDiv.appendChild(userEmail)
        this.userDiv.appendChild(pickFractionBtn)
        this.userDiv.appendChild(userChoosenFraction)
        this.userDiv.appendChild(startGameButton)
    }

    showMainMenu = () => {
        this.fractionMenu.style.display = "none"
        // this.searchGameMenu.style.display = "none"
        this.insertDiv.style.display = "flex"
        this.userChoosenFractionP.innerText = "Choosen fraction: " + this.fractionData.name
        this.startGameButton.removeAttribute("disabled")
        if (!this.deckShowed) {
            this.showDeckCards()
        }

    }

    showFractionMenu = async () => {
        this.insertDiv.style.display = "none"
        
        // creating choose fraction menu
        const main = document.createElement("div")
        main.classList.add("choose-fraction-menu")
        this.fractionMenu = main

        const title = document.createElement("h3")
        title.innerText = "Choose your fraction"
        main.appendChild(title)

        this.mainDiv.appendChild(main)

        // creating card for each fraction
        const fractionContainer = document.createElement("div")
        fractionContainer.classList.add("fraction-container")
        const fractionsData = await this.fetchForFractions()
        console.log(fractionsData)
         // --- choosen info ---
         const infoP = document.createElement("p")
         infoP.innerText = "You choosed: "
         infoP.setAttribute("id", "choosen-info")
         // --- accept button ---
         const acceptBtn = document.createElement("button")
         acceptBtn.innerText = "SELECT THIS FRACTION"
         acceptBtn.setAttribute("disabled", "true")
         acceptBtn.onclick = () => this.showMainMenu()
         acceptBtn.classList.add("button")


         // ------- fractions -------
        fractionsData.data.forEach((fraction) => {
            // --- main container ---
            const container = document.createElement("div")
            container.classList.add("fraction-card")
            container.onclick = () => {
                this.fractionData = fraction
                acceptBtn.removeAttribute("disabled")
                infoP.innerText = "You choosed: " + fraction.name
            }
            let imgSrc = "/imgs/"
            let liderSrc = "/imgs/liders/"
            let bgc
            switch (fraction.name) {
                case "Humans":
                    imgSrc += "human-kingdom.png"
                    liderSrc += "human-king.png"
                    bgc = "blue"
                    break
                case "Demons":
                    imgSrc += "demons-kingdom.webp"
                    liderSrc += "demons-king.png"
                    bgc = "red"
                    break
                case "Undeads":
                    imgSrc += "undeads-kingdom.jpeg"
                    liderSrc += "undeads-king.png"
                    bgc = "green"
                    break
            }
            container.style.background = `url("${imgSrc}")`
            // --- info container (blured)---
            const infoContainer = document.createElement("div")
            infoContainer.classList.add("info-container")

            const title = document.createElement("h3")
            title.innerText = fraction.name
            infoContainer.appendChild(title)

            const description = document.createElement("p")
            description.innerText = fraction.description
            infoContainer.appendChild(description)

            // --- lider ---
            const liderContainer = document.createElement("div")
            liderContainer.classList.add("lider-container")

            const liderImg = document.createElement("img")
            liderImg.src = liderSrc
            liderImg.alt = fraction.name + " king"
            liderContainer.appendChild(liderImg)

            const liderTitle = document.createElement("p")
            liderTitle.innerText = fraction.lider.name
            liderTitle.classList.add("lider-name")
            liderContainer.appendChild(liderTitle)

            const liderLifes = document.createElement("p")
            liderLifes.innerText = "Lifes: " +fraction.lider.lifes
            liderLifes.classList.add("lider-lifes")
            liderContainer.appendChild(liderLifes)

            infoContainer.appendChild(liderContainer)
            container.appendChild(infoContainer)
            fractionContainer.appendChild(container)
        })
       
        main.appendChild(fractionContainer)
        main.appendChild(infoP)
        main.appendChild(acceptBtn)
        
        



    }

    showDeckCards = () => {
        this.deckShowed = true
        const title = document.createElement("h3")
        title.innerText = "Your cards: "
        title.classList.add("deck-title")
        this.deckDiv.appendChild(title)
    }

    showSearchForGameMenu = () => {
        console.log("aa")
        this.insertDiv.style.display = "none"
        if (this.searchGameMenu) {
            return this.searchGameMenu.style.display = "flex"
        }
        
        // creating choose fraction menu
        const main = document.createElement("div")
        main.classList.add("search-game-menu")
        this.searchGameMenu = main

        const title = document.createElement("h3")
        title.innerText = "Search for game"
        main.appendChild(title)

        this.mainDiv.appendChild(main)

        const gamePickMenu = document.createElement("div")
        this.gamePickMenu = gamePickMenu
        gamePickMenu.classList.add("game-pick-menu")
        main.appendChild(gamePickMenu)
        // create game button
        const createGameBtn = document.createElement("button")
        createGameBtn.classList.add("button")
        createGameBtn.innerText = "CREATE GAME"
        createGameBtn.onclick = () => this.createGame()
        main.appendChild(createGameBtn)

        // join game button
        const joinGameButton = document.createElement("button")
        joinGameButton.classList.add("button")
        joinGameButton.innerText = "JOIN GAME"

        main.appendChild(joinGameButton)

        // search for random game button
        const randomGameBtn = document.createElement("button")
        randomGameBtn.classList.add("button")
        randomGameBtn.innerText = "RANDOM ENEMY"
        randomGameBtn.onclick = () => this.searchForRandomGame()
        main.appendChild(randomGameBtn)

        // back button
        const backBtn = document.createElement("button")
        backBtn.classList.add("back-button")
        backBtn.classList.add("button")
        backBtn.innerText = "BACK"
        backBtn.onclick = () => {
            this.searchGameMenu.style.display = "none"
            this.showMainMenu()
        }
        main.appendChild(backBtn)

        if (!this.socketEstabilished) {
            this.estabilishSocket()
        }
    }

    searchForRandomGame = () => {
        const context = {
            userId: this.userData._id,
            userName: this.userData.name,
            userEmail: this.userData.email,
            fraction: this.fractionData
        }
        sessionStorage.setItem("UserContext", JSON.stringify(context))
        window.location.href = "/search"
    }

    fetchForFractions = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch("/fraction", {
                    method: "POST"
                })
                const resData = await res.json()
                resolve({data: resData})
            } catch (err) {
                reject({err})
            }
        })
    }

    estabilishSocket = () => {
        const socket = io.connect("http://localhost:3001");
        socket.emit("join-lobby", {userId: this.userData._id});
        this.socketEstabilished = true
    }

    createGame = () => {
        if (!this.socketEstabilished) return
        const createGameMenu = document.createElement("div")
        createGameMenu.classList.add(createGameMenu)
    }
}