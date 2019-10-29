const mongoose = require("mongoose");
const Schema = mongoose.Schema;


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
      type: Date
    }

  });

module.exports = Calendar = mongoose.model("calendar", CalendarSchema);
