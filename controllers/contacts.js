const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find().toArray();
    console.log('Retrieved data:', result); // Log the retrieved data
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching all contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSingle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    console.log('userId:', userId); // Log the userId
    const result = await mongodb.getDb().db().collection('contacts').findOne({ _id: userId });
    console.log('Retrieved single contact:', result); // Log the retrieved single contact
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching single contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAll, getSingle };
  