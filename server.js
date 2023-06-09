const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())


app.use(express.static(`${__dirname}/../public`))


// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'e39749e3564642eea9d6c90bc3538c47',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

const students = ['Jimmy', 'Timothy', 'Jimothy']

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/api/students', (req, res) => {
    rollbar.info('The Students name werent sent')
    res.status(200).send(students)
})

app.post('/api/students', (req, res) => {
   let {name} = req.body

   const index = students.findIndex(student => {
       return student === name
   })

   try {
       if (index === -1 && name !== '') {
           students.push(name)
          
           res.status(200).send(students)
       } else if (name === ''){
        
           res.status(400).send('You must enter a name.')
       } else {
        
           res.status(400).send('That student already exists.')
       } 
   } catch (err) {
       console.log(err)
    
   }
})

app.delete('/api/students/:index', (req, res) => {
    const targetIndex = +req.params.index

   let deleteNmae = students.splice(targetIndex, 1)
   
    res.status(200).send(students)
})

const port = process.env.PORT || 5050

app.listen(port, () => console.log(`Server listening on ${port}`))