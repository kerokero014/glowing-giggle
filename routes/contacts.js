const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll); //read all

router.get('/:id', contactsController.getSingle); //read single

router.post('/', contactsController.createContact); //create

router.put('/:id', contactsController.updateContact); //uptade

router.delete('/:id', contactsController.deleteContact); //Delete 

module.exports = router;
