var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const { state } = require('../config.js')

const url = 'mongodb://localhost:27017/myproject'
const dbName = 'myproject'

const client = new MongoClient(url)
const {
  insertOneDocumentPost,
  insertManyDocuments,
  findDocuments,
  searchDocuments,
  deleteManyDocuments,
  deleteOneDocument,
} = require('./libAsync.js')
// } = require('./libCallback.js')

if ( state.debug ) {
  console.log('-- index.js log --')
}





client.connect(err => {
	assert.equal(null, err)
	console.log("Connected successfully to server")
  const db = client.db(dbName)
  let result = null

  // test api
  router.get('/api/gettest', (req, res) => {
    console.log(req.query)
    res.send(req.query)
  })
  router.post('/api/posttest', (req, res) => {
    console.log(req.body)
    res.send(req.body)
  })

  // html
  router.get('/', function(req, res, next) {
    console.log(req.query)
    res.render('index', { title: 'mongodb Tool' });
  });

	router.get('/user_list', (req, res) => {
    findDocuments(db)
      .then(docs => {
        if(state.debug) console.log('api/find: result ', docs)
        res.render('user_list', { userList: docs })
      })
      .catch(e => console.error(e.message))
  })

  router.get('/user_insert', (req, res, next) => {
    res.render('user_insert' )
  })

  router.get('/user_search', (req, res, next) => {
    res.render('user_search' )
  })


  // api
  router.delete('/api/removeuser', (req, res) => {
    const removeData = req.body
    if(state.debug) {
      console.log('api/removeuser: ', req.body)
    }
    deleteOneDocument({db, removeData })
      .then(result => {
        // if (state.debug) console.log(result.result)
      })
      .catch(e => console.error(e.message))
  })


	router.get('/api/deletemany', (req, res) => {
    console.log(req.query)
    deleteManyDocuments(db)
      .then(result => {
        console.log(result.result)
      })
      .catch(e => console.error(e.message))
		res.send('delete done')
  })

	router.post('/api/insertonepost', (req, res) => {
    const insertOneData = req.body 
    if (state.debug) {
      console.log('api/insertonepost: ', insertOneData)
    }
    insertOneDocumentPost({ db, insertOneData })
      .then(result => {
        console.log(result.result)
      })
      .catch(e => console.error(e.message))

  })

	router.get('/api/insertmany', (req, res) => {
    console.log(req.query)
    insertManyDocuments(db)
      .then(result => {
        console.log('api/insertmany result: ', result.resul)
      })
      .catch(e => console.error(e.message))
		res.send('insertmany done')
  })

	router.get('/api/find', (req, res) => {
    findDocuments(db)
      .then(docs => {
        if(state.debug) console.log('api/find: result ', docs)
        res.render('user_find', { userList: docs })
      })
      .catch(e => console.error(e.message))
  })
  

	router.get('/api/search', (req, res) => {
		const findsData = req.query
    console.log(req.query)
    searchDocuments({db, findsData })
      .then(docs => {
        if (state.debug) console.log('api/search: ', docs)
        res.render('user_list', { userList: docs})
      })
      .catch(e => console.error(e.message))
  })

})


module.exports = router;
