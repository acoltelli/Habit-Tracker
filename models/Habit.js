const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const HabitSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  // TODO: really only need user ID here
  owner: {
    type: Object,
    required: true
  },
  frequency: {
    type: Number,
    default: 7,
    required: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  color: {
    type: String,
    default: '#265985',
    required: true
  }
});

module.exports = Habit = mongoose.model("habits", HabitSchema);
