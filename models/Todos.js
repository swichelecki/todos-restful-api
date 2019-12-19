const mongoose = require('mongoose');

const TodosSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  isComplete: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('Todos', TodosSchema);