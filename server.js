const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

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
    //I want to get an info if students name are sent
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
           //I want to get an rollbar info when a new student name is added
           rollbar.info(`New student name is added: ${name}`)
           res.status(200).send(students)
       } else if (name === ''){
        //Want to get a warning when theres no inpu
            rollbar.warning('there was no name entered')
           res.status(400).send('You must enter a name.')
       } else {
        //want a warning when someone enters an already existing name
            rollbar.warning('someone entered an exisiting name')
           res.status(400).send('That student already exists.')
       } 
   } catch (err) {
       console.log(err)
    //I want to get an error message to rollbar
    rollbar.error(err)
   }
})

app.delete('/api/students/:index', (req, res) => {
    const targetIndex = +req.params.index

   let deleteNmae = students.splice(targetIndex, 1)
    //get an info when a student is deleted 
    rollbar.info(`someone deleted the name ${deleteNmae}`)
    res.status(200).send(students)
})

const port = process.env.PORT || 5050

app.listen(port, () => console.log(`Server listening on ${port}`))