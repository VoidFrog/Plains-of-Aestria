import Space from './classes/Space.js'
import Board from './classes/Board.js'
import Card from './classes/Card.js'
import cards from './classes/card_examples.js'
import {resize_handler} from './utilityFunctions.js'

let all_cards = cards.all_cards
let root = document.getElementById('root')

let space = new Space()
space.render()

let board = new Board(0,0,0, window.innerWidth, window.innerHeight, space)
space.board = board


for(let i = 0; i<7; i++){
    let card = new Card(i, space, 500,10,300, all_cards)
    board.cards.push(card)
}

resize_handler(space)

