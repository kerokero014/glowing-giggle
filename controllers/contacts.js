const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('contacts').collection('contacts').find();
    const lists = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    console.error('Error in getAll function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    console.log('userId:', userId);

    const result = await mongodb
      .getDb()
      .db('contacts')
      .collection('contacts')
      .find({ _id: userId });

    const lists = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    console.log('lists:', lists);

    if (lists.length > 0) {
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error in getSingle function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//
//const createContact = async (req, res, next) => {
//  try{
//    const newContact = req.body;
//    const result = await mongodb
//      .getDb()
//      .db("contacts")
//      .collection("contacts")
//      .insertOne(newContact);
//    console.log("result:", result);
//
//    res.setHeader("Content-Type", "application/json");
//    res.status(201).json({ message: "Contact created successfully" });
//  }
//  catch(error){
//    console.error("Error in createContact function:", error);
//    res.status(500).json({ error: "Internal Server Error" });
//  }
//};
//

const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb.getDb().db('contacts').collection('contacts').insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      throw new Error('Contact creation not acknowledged');
    }
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Some error occurred while creating the contact.' });
  }
};

const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const contact = {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
      }
    };

    const response = await mongodb
      .getDb()
      .db('contacts')
      .collection('contacts')
      .updateOne({ _id: userId }, contact);

    if (response.acknowledged && response.modifiedCount > 0) {
      res.status(200).json({ message: 'Contact updated successfully', contact });
    } else if (response.acknowledged && response.modifiedCount === 0) {
      res.status(404).json({ error: 'Contact not found' });
    } else {
      throw new Error('Contact update not acknowledged');
    }
  } catch (error) {
    console.error('Error updating contact:', error.message);
    res.status(500).json({ error: 'Some error occurred while updating the contact.' });
  }
};

const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db('contacts')
      .collection('contacts')
      .deleteOne({ _id: userId }, true);

    if (response.acknowledged) {
      res.status(204).json(response);
    } else {
      throw new Error('Contact deletion not acknowledged');
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Some error occurred while deleting the contact.' });
  }
};

module.exports = {
  getAll: getAll,
  getSingle: getSingle,
  createContact: createContact,
  updateContact: updateContact,
  deleteContact: deleteContact
};
