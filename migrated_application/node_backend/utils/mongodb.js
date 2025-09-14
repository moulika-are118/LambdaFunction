const { MongoClient, ObjectId } = require('mongodb');
const createError = require('http-errors');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'productdb';

let client;
let db;

async function connect() {
  if (!client) {
  client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(DB_NAME);
  }
  return db;
}

function toJSON(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id.toString(), ...rest };
}

async function find({ collection, filter = {}, options = {} }) {
  try {
    const db = await connect();
    const docs = await db.collection(collection).find(filter, options).toArray();
    return docs.map(toJSON);
  } catch (err) {
    throw createError(500, err.message);
  }
}

async function findOne({ collection, filter = {} }) {
  try {
    const db = await connect();
    const doc = await db.collection(collection).findOne(filter);
    return toJSON(doc);
  } catch (err) {
    throw createError(500, err.message);
  }
}

async function insert({ collection, document }) {
  try {
    const db = await connect();
    const result = await db.collection(collection).insertOne(document);
    return { id: result.insertedId.toString(), ...document };
  } catch (err) {
    throw createError(500, err.message);
  }
}

async function update({ collection, id, update }) {
  try {
    const db = await connect();
    const result = await db.collection(collection).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: 'after' }
    );
    return toJSON(result.value);
  } catch (err) {
    throw createError(500, err.message);
  }
}

async function remove({ collection, id }) {
  try {
    const db = await connect();
    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) throw createError(404, 'Document not found');
    return { deleted: id };
  } catch (err) {
    throw createError(500, err.message);
  }
}

module.exports = {
  connect,
  find,
  findOne,
  insert,
  update,
  remove,
};
