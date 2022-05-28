let root = document.getElementById('root')

let space = new Space()
space.render()

let board = new Board(0,0,0, window.innerWidth, window.innerHeight)
let card = new Card(1)

resize_handler()

