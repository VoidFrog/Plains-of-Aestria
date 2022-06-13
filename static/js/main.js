import Space from './classes/Space.js'
import Board from './classes/Board.js'
import Card from './classes/Card.js'
import cards from './classes/card_examples.js'
import {resize_handler} from './utilityFunctions.js'

let all_cards = cards.all_cards
let root = document.getElementById('root')

let space = new Space()
space.render()

let board = new Board(0,0,0, window.innerWidth, window.innerHeight, space, Card, all_cards)
space.board = board

resize_handler(space)