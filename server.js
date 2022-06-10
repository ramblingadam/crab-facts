const { application } = require('express')
const express = require('express')
const crab = express()
const MongoClient = require('mongodb').MongoClient
PORT = process.env.PORT || 8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'crabsDB'

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
  db.collection('crabFacts').find().toArray()
    .then(data => {
      console.log(data)
      res.render('index.ejs', { info: data })
    })
    .catch(error => console.log(error))
})

// crab.post('/addFact', (req, res) => {
//   db.collection('crabFacts')
// })



crab.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})