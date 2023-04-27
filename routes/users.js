var express = require('express');
var router = express.Router();
const { authenticate } = require('../middlewares/auth');

const { User } = require('../models');

// Creating a new user
router.post('/', authenticate, async(req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user)
  } catch (error){
    res.status(500).json({ message: 'Error creating user', error});
  }
})

// Getting a list of users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({message: 'Error retrieving list of users'});
  }
})

// Getting a specific user by ID
router.get('/:id', async (req, res) => {
  try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
          res.status(404).json({ message: 'User not found' });
      } else {
          res.json(user);
      }
  } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
  }
});

// Updating user by ID
router.put('/:id', authenticate, async (req, res) => {
  const { username, password } = req.body;
  try {
      const newUser = {};
      if (username !== undefined) {
          newUser.usernam = username;
      }
      if (password !== undefined) {
          newUser.password = password;
      }
      const [updated] = await User.update(req.body, {
          where: { id: req.params.id },
      });
      if (updated) {
          const updatedUser = await User.findByPk(req.params.id);
          res.json(updatedUser);
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error updating User', error });
  }
});

//Delete a user by ID
router.delete('/:id', authenticate, async (req, res) => {
  try {
      const deleted = await User.destroy({
          where: { id: req.params.id },
      });
      if (deleted) {
          res.status(204).json({ message: "User deleted" });
      } else {
          res.status(404).json({ message: "User not found" });
      }
  } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
  }
});

module.exports = router;
