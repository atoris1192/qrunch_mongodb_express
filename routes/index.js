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
  findOneDocument,
  updateOneDocument,
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

  router.get('/user_edit', (req,res) => {
    let mid = req.params.mid || "none"
    let mongoId = req.query || "none"
    let _id = mongoId._id || "none"

    if (state.debug) {
      console.log('mongoId: ', req.query)
      console.log('mid: ', req.params.mid)
      console.log('_id: ', mongoId._id)
    }
    findOneDocument({db, _id})
      .then(doc => {
        const arrayDoc = Object.entries(doc)
        if(state.debug){
          console.log('user_edit doc', doc)
          console.log('user_edit arrayDoc', arrayDoc)
        } 
        res.render('user_edit', { userData : arrayDoc})
      })
      .catch(e => console.error(e.message))
  })

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
  router.post('/api/updateone', (req, res) => {
    const data = req.body
    if(state.debug) {
      console.log('api/updateone data: ', data);
    }
    updateOneDocument({ db, data })
      .then(result => {
        console.log('api/updateone', result.result)
      })
      .catch(e => console.error(e.message))
  })

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
    res.send('delete done')
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

  router.get('/users/:mid', (req,res) => {
    let mid = req.params.mid
    let mongoId = req.query
    let _id = mongoId._id

    if (state.debug) {
      console.log('mongoId: ', req.query)
      console.log('mid: ', req.params.mid)
      console.log('_id: ', mongoId._id)
    }
    findOneDocument({db, _id})
      .then(doc => {
        if(state.debug) console.log('user_edit doc', doc)
        res.render('user_edit', { userData : doc })
      })
      .catch(e => console.error(e.message))
    res.send(mongoId)
  })

})


module.exports = router;
