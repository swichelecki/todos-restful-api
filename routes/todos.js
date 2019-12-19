const express = require('express');
const router = express.Router();
const Todo = require('../models/Todos');

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post('/', async (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  try {
    const savedTodo = await todo.save();
    res.json(savedTodo);
  } catch (err) {
    res.json({ message: err });
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.deleteOne({ _id: req.params.id });
    res.json(deletedTodo);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.updateOne(
      { _id: req.params.id},
      { $set: { 
        isComplete: req.body.isComplete,
        text: req.body.text
       } 
      }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;