const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/css' , (req, res) => {
    res.sendFile(__dirname + '/public/styles.css')
})

app.get('/js' , (req, res) => {
    res.sendFile(__dirname + '/public/main.js')
})

app.listen(5150, () => {
    console.log('app is up on 5150')
})

