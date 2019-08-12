const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var date = new Date();
const DaySchema = new Schema({
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

module.exports = Day = mongoose.model("days", DaySchema);
