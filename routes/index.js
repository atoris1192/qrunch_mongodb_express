var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')


const url = 'mongodb://localhost:27017/myproject'
const dbName = 'myproject'
const client = new MongoClient(url)
const lib = require('./libCallback.js')
const { insertManyDocuments, insertOneDocument, findDocuments, deleteManyDocuments, findDocuments_2 } = lib


client.connect(err => {
	assert.equal(null, err)
	console.log("Connected successfully to server")
	const db = client.db(dbName)

  /* GET home page. */
  router.get('/', function(req, res, next) {
    console.log(req.query)
    res.render('index', { title: 'mongodb' });
  });

	router.get('/delete', (req, res) => {
		console.log(req.query)
		deleteManyDocuments(db, (result) => {
			console.log(result.result)
		})
		res.send('delete done')
	})
	router.get('/insertMany', (req, res) => {
		console.log(req.query)
		insertManyDocuments(db, (result) => {
			console.log(result.result)
		})
		res.send('insert done')
	})
	router.get('/find', (req, res) => {
		console.log(req.query)
		findDocuments(db, (docs) => {
			console.log(docs)
		})
		res.send('find done')
	})
	router.get('/find2', (req, res) => {
		const findsData = req.query
		console.log(req.query)
		findDocuments_2({ db, findsData },  (docs) => {

			console.log(docs)
		})
		res.send('find2 done')
  })
})


module.exports = router;
