const assert = require('assert')
const { state } = require('../config.js')
const colName = 'documents'
const ObjectId = require('mongodb').ObjectID

if ( state.debug ) console.info('-- libAsync log --')

module.exports.deleteOneDocument= async({ db, removeData }) => {
  const collection = db.collection(colName)
  const removeDataArray = Object.entries(removeData)

  let r = null
  for(let item of removeDataArray) {
    console.log('deleteOneDocument id: ', item[1])

    const obj = {
      "_id": ObjectId(item[1])
      // "_id": ObjectId("5c0b67bcb86361681b3160a0")
    }
       r = await collection.deleteOne(obj)
  }
  return r
}


module.exports.deleteManyDocuments = async(db) => {
  const collection = db.collection(colName)
  return await collection.deleteMany({})
}

module.exports.insertManyDocuments = async(db) => {
  const collection = db.collection(colName)
  return await collection.insertMany([
    { name: 'toto', age: 25, weight: 65, height: 176 },
    { name: 'momo', age: 27, weight: 50, height: 163 },
    { name: 'koko', age: 25, weight: 87, height: 189 },
    { name: 'nattou', age: 25, weight: 47, height: 110 },
    { name: 'hotaru', age: 25, weight: 65, height: 179 },
    { name: 'takuma', age: 55, weight: 78, height: 183 },
  ])
}

module.exports.updateOneDocument = async({ db, data }) => {
  const collection = db.collection(colName)

  const updateData =[
    { _id : ObjectId(data._id)},
    { $set: { name: data.name, age: data.age, weight: data.weight, height: data.height }},
  ]
  
  return await collection.updateOne(...updateData)

  // { _id: '5c0b9fd4101376cd30804fea',
  // name: 'toto',
  // age: '25',
  // weight: '6',
  // height: '176' }

}

module.exports.findOneDocument = async({db, _id }) => {
  const collection = db.collection(colName)
  const obj = {
    "_id": ObjectId(_id)
    // "_id": ObjectId("5c0b67bcb86361681b3160a0")
  }
  if(state.debug) console.log('findOneDocument obj: ', obj)
  
  return await collection.findOne(obj)
}

module.exports.findDocuments = async(db) => {
  const collection = db.collection(colName)
  return await collection
    .find({})
    // .project({ '_id': 0})
    .limit(100)
    .toArray() 
}

module.exports.searchDocuments = async({ db, findsData }) => {
  const collection = db.collection(colName)
	const value = Object.entries(findsData)[0][1]
	const key   = Object.entries(findsData)[0][0]
	const fixFindsData = {}
	const type = fixFindsData[key] = (value - 0)
	// console.log('NaN or integer: ', type)
	const input = type ? fixFindsData : findsData
  return await collection
		.find(input)
		.project({ '_id': 0})
		.limit(100)
		.toArray()

}

module.exports.insertOneDocumentPost= async({ db, insertOneData }) => {
	const collection = db.collection(colName)
	const arrayInsertOneData = Object.entries(insertOneData)
  const fixInsertOneData = {}
  for(let [ key, value ] of arrayInsertOneData) {
    // key = item[0]
    // value = item[1]
    fixInsertOneData[key] = (value - 0)
  }
  delete fixInsertOneData.name
  const input = { ...insertOneData, ...fixInsertOneData }

	if (state.debug) {
    console.log('input: ', input)
	}

  return collection.insertOne( input )
}

