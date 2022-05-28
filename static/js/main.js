import Space from './classes/Space.js'
import Board from './classes/Board.js'
import Card from './classes/Card.js'

let root = document.getElementById('root')

let space = new Space()
space.render()

let board = new Board(0,0,0, window.innerWidth, window.innerHeight, space)
let card = new Card(1, space)

resize_handler(space)

