const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

var URL = 'mongodb://admin:12345@ds235388.mlab.com:35388/star-wars-quotes' 
var db

MongoClient.connect(URL, (err, client) => {
  if (err) return console.log(err)
  db = client.db('star-wars-quotes') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})


app.get('/', (req, res) => {
	
	db.collection('quotes').find().toArray(function(err, results) {
	  console.log(results)
	  // send HTML file populated with quotes here
	})
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
	if (err) return console.log(err)

	console.log('saved to database')
	res.redirect('/')
  })
})
