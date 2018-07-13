const express = require('express');
const router = express.Router();

// User model
const Users = require('../models/users');

// @route   GET /api/users/
// @desc    Get all users
// @access  Public
router.get('/', async (req, res) => {
  try {
    const users = await Users.find({});
    res.send({ users })
  } catch(err) {
    res.status(400).send({ error: err });
  }
});

// @route   GET /api/users/:id
// @desc    Get a specific user
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.send({ user });
  } catch (err) {
    res.status(404).send({ message: 'User not found!' });
  }
});

// @route   POST /api/users/
// @desc    Create a user
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newUser = await Users.create({ name: req.body.name, genre: req.body.genre, age: req.body.age });
     res.send({ newUser });
  } catch(err) {
    res.status(400).send({ error: err });
  }

});

// @route   PUT /api/users/:id
// @desc    Update a user
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body);
     res.send({ message: 'The user was updated' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete a user
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const removeUser = await Users.findByIdAndRemove(req.params.id);
     res.send({ message: 'The user was removed' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
});


module.exports = router;