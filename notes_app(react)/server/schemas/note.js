const { Schema } = require("mongoose");

const Note = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: { type: Date }
});

module.exports = Note;
