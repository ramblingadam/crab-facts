const express = require('express')
const crab = express()
const MongoClient = require('mongodb').MongoClient
PORT = process.env.PORT || 8000
require('dotenv').config()

let db
let dbConnectionStr = process.env.DB_STRING
let dbName = 'crabsDB'

// console.log('attempting to connect to db')
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
.then(client => {
  console.log(`Connected to ${dbName} Database.`)
  db = client.db(dbName)

})

crab.set('view engine', 'ejs')
crab.use(express.static('public'))
crab.use(express.urlencoded({ extended: true })) // Parses URL via qs library
crab.use(express.json())



crab.get('/', (req, res) => {
  db.collection('crabFacts').find().sort({likes: -1}).toArray()
    .then(data => {
      // console.log(data)
      res.render('index.ejs', { info: data })
    })
  .catch(error => console.log(error))
})

crab.get('/resetlikes/:pw', (req, res) => {
  if(req.params.pw === process.env.DELETE_PW) {
    db.collection('crabFacts').updateMany({},
      {$set: {
        likes: 0
      }})
      .then(result => {
        res.redirect('/')
      })
  }
  else res.redirect('/')
})

crab.post('/addFact', (req, res) => {
  if(req.body.fact.toLowerCase().includes('crab')) {
    db.collection('crabFacts').insertOne( { fact: req.body.fact, likes: 0 })
    .then(result => {
      console.log('Crab fact added.')
      res.redirect('/')
    })
    .catch(error => console.log(error))
  }
  else res.json('Your fact MUST be about crabs!')
})

crab.put('/addOneLike', (req, res) => {
  db.collection('crabFacts').updateOne({ fact: req.body.factToLike, likes: req.body.currentLikes}, {
    $set: {
      likes:req.body.currentLikes + 1
    }
  })
  .then(result => {
    console.log('1 Like added.')
    res.json('1 like added.')
  })
  .catch(error => console.error(error))
})

// crab.get('/pwcheck', (req, res) => {
//   console.log(req.body.pw)
//   // if(req.body.pw === process.env.DELETE_PW) res.
// })


crab.delete('/deleteFact', (req, res) => {
  console.log(req.body.pw)
  if(req.body.pw === process.env.DELETE_PW) {
    db.collection('crabFacts').deleteOne({fact: req.body.factToDelete})
    .then(result => {
      console.log('Crab fact deleted.')
      res.json('Crab fact deleted.')
    })
    .catch(error => console.error(error))
  } else {
    console.log('Incorrect password.')
    res.json({ msg: 'Incorrect password.'} )
  }
})

crab.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})