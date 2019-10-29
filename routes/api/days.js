const express = require("express");
const router = express.Router();
const passport = require("passport");
const Calendar = require("../../models/Calendar");


// get Day by user
router.get(
  "/",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    await Calendar.find({ user: req.user.id })
      .then(days => {
        res.json(days);
      })
      .catch(err => console.log(err));
  }
);

router.get(
  "/todaysCompleted",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    var date = new Date();
    await Calendar.find({ user: req.user.id, date: {"$gte": [date.getFullYear(), date.getMonth() + 1, date.getDate()]}})
      .then(days => {
        res.json(days);
      })
      .catch(err => console.log(err));
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    let id = req.params.id;
    Calendar.findById(id).then(day => res.json(day));
  }
);

router.post(
  "/createDay",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {
    var date = new Date();
    var localTime = new Date(date.getTime() - (req.body.offset));
    const HABIT = {
      _id: req.body.id,
      title: req.body.name,
      backgroundColor: req.body.color,
      allDay: true,
      start: [localTime.getFullYear(), localTime.getMonth() + 1, localTime.getDate()],
      end: [localTime.getFullYear(), localTime.getMonth() + 1, localTime.getDate()]
    };
    const NEW_DAYENTRY = await new Calendar({
      eventData: HABIT,
      user: req.user.id,
      date: new Date(date.getTime() - (req.body.offset))
    });
    NEW_DAYENTRY.save().then(day => res.json(day));
  }
);

module.exports = router;
