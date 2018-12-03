const assert = require('assert')


module.exports.updateOneDocument = (db, callback) => {
	const collection = db.collection('documents')
	collection.updateOne(
		{ a: 1 },
		{ $set: { a: 100 }}, (err, result) => {
			assert.equal(err, null)
			console.log("update the records")
			callback(result)
		})
}

module.exports.deleteManyDocuments = (db, callback) => {
	const collection = db.collection('documents')
	collection.deleteMany({}, (err, result) => {
		assert.equal(err, null)
		console.log("Delete All")
		callback(result)
	})
}

module.exports.findDocuments = (db, callback) => {
	const collection = db.collection('documents')
	collection
		.find({})
		.project({ '_id': 0})
		.toArray((err, docs) => {
			assert.equal(err, null)
			console.log("Founds the records")
			callback(docs)
		})
}

module.exports.findDocuments_2 = ({ db, findsData }, callback) => {
	const collection = db.collection('documents')
	const value = Object.entries(findsData)[0][1]
	const key   = Object.entries(findsData)[0][0]
	const fixFindsData = {}
	const type = fixFindsData[key] = (value - 0)
	console.log('NaN or integer: ', type)
	const input = type ? fixFindsData : findsData
	collection
		.find(input)
		.project({ '_id': 0})
		.toArray((err, docs) => {
			assert.equal(err, null)
			console.log("Founds the records")
			callback(docs)
		})
}

module.exports.insertManyDocuments = (db, callback) => {
	const collection = db.collection('documents')
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
