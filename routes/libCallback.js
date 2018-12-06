const assert = require('assert')
const { state } = require('../config.js')
const colName = 'documents'

if ( state.debug ) console.info('-- libCallback log --')

module.exports.updateOneDocument = (db, callback) => {
	const collection = db.collection(colName)
	collection.updateOne(
		{ a: 1 },
		{ $set: { a: 100 }}, (err, result) => {
			assert.equal(err, null)
			console.log("update the records")
			callback(result)
		})
}

module.exports.deleteManyDocuments = (db, callback) => {
	const collection = db.collection(colName)
	collection.deleteMany({}, (err, result) => {
		assert.equal(err, null)
		console.log("Delete All")
		callback(result)
	})
}

module.exports.findDocuments = (db, callback) => {
	const collection = db.collection(colName)
	collection
		.find({})
		.project({ '_id': 0})
		.limit(100)
		.toArray((err, docs) => {
			assert.equal(err, null)
			console.log("Founds the records")
			callback(docs)
		})
}

module.exports.findDocuments_2 = ({ db, findsData }, callback) => {
	const collection = db.collection(colName)
	const value = Object.entries(findsData)[0][1]
	const key   = Object.entries(findsData)[0][0]
	const fixFindsData = {}
	const type = fixFindsData[key] = (value - 0)
	console.log('NaN or integer: ', type)
	const input = type ? fixFindsData : findsData
	collection
		.find(input)
		.project({ '_id': 0})
		.limit(100)
		.toArray((err, docs) => {
			assert.equal(err, null)
			console.log("Founds the records")
			callback(docs)
		})
}

module.exports.insertOneDocumentGet= ({ db, insertOneData }, callback) => {
	const collection = db.collection(colName)

	// insertOneLog { name: 'toto', age: '23' }

  console.log('insertOneData', insertOneData)
	const ent = Object.entries(insertOneData)
	console.log(ent)

	collection.insertOne({name: 'nokoko'}, (err, result) => {
		assert.equal(err, null)
		assert.equal(1, result.result.n)
		assert.equal(1, result.ops.length)
		console.log("Inserted  document")
		callback(result)
	})
}

module.exports.insertOneDocumentPost= ({ db, insertOneData }, callback) => {
	const collection = db.collection(colName)
	const ent = Object.entries(insertOneData)



	if (state.debug) {
		console.log('insertOneDocumentPost insertOneData : ', insertOneData)
		console.log('insertOneDocumentPost entries', ent)
	}

	collection.insertOne( insertOneData , (err, result) => {
		assert.equal(err, null)
		assert.equal(1, result.result.n)
		assert.equal(1, result.ops.length)
		callback(result)
	})
}

module.exports.insertManyDocuments = (db, callback) => {
	const collection = db.collection(colName)
	collection.insertMany([
		{ name: 'toto', age: 25, weight: 65, height: 176 },
		{ name: 'momo', age: 27, weight: 50, height: 163 },
		{ name: 'koko', age: 25, weight: 87, height: 189 },
		{ name: 'nattou', age: 25, weight: 47, height: 110 },
		{ name: 'hotaru', age: 25, weight: 65, height: 179 },
		{ name: 'takuma', age: 55, weight: 78, height: 183 },
	], (err, result) => {
		assert.equal(err, null)
		assert.equal(6, result.result.n)
		assert.equal(6, result.ops.length)
		console.log("Insered  documents")
		callback(result)
	})
}
