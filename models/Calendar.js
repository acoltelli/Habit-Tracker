const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var date = new Date();
const CalendarSchema = new Schema({
  eventData: {
      type: Object,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    date: {
      type: Date,
      default: [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    }

  });

module.exports = Calendar = mongoose.model("calendar", CalendarSchema);
