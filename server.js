let express = require('express')
let app = express()
const PORT = 3000 


app.use(express.static('./static'))
app.use(express.static('./libs'))


app.get('/', (req, res) => {
    res.sendFile('index.html')
})


app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})