const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var date = new Date();
var offset = date.getTimezoneOffset()
var localTime = new Date( date.getTime() -  ( offset * 60000 ) );
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
      default: localTime
    }

  });

module.exports = Calendar = mongoose.model("calendar", CalendarSchema);
