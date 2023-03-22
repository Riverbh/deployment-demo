const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.listen(5150, () => {
    console.log('app is up on 5150')
})