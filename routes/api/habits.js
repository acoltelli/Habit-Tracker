const express = require("express");
const router = express.Router();
const passport = require("passport");
const Habit = require("../../models/Habit");
const Validator = require("validator");
const isEmpty = require("is-empty");


function validateHabitInput(data) {
  let errors = {};
  data.habitName = !isEmpty(data.habitName) ? data.habitName : "";
  data.color = !isEmpty(data.color) ? data.color : "";
  if (Validator.isEmpty(data.habitName)) {
    errors.habitName = "Please enter a habit name";
  }
  if (Validator.isEmpty(data.color)) {
    errors.color = "Please select a color";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

// Get habits by user
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };
    await Habit.find({ owner: OWNER })
      .then(habits => {
        res.json(habits);
      })
      .catch(err => console.log(err));
  }
);

// Get completed habits, by user
router.get(
  "/completedHabits",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };
    await Habit.find({ owner: OWNER, complete: false})
      .then(habits => {
        res.json(habits);
      })
      .catch(err => console.log(err));
  }
);

// Get all habits by id
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    Habit.findById(id).then(habit => res.json(habit));
  }
);

// Create new habit
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateHabitInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    var date = new Date();
    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };
    const NEW_HABIT = await new Habit({
      owner: OWNER,
      name: req.body.habitName,
      color: req.body.color,
      date: new Date(date.getTime() - (req.body.offset))
    });
    NEW_HABIT.save().then(habit => res.json(habit));
  }
);

// Edit habit
router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateHabitInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let habitFields = {};
    habitFields.name = req.body.habitName;
    habitFields.color = req.body.color;
    Habit.findOneAndUpdate(
      { _id: req.body.id },
      { $set: habitFields },
      { new: true }
    )
      .then(habit => {
        res.json(habit);
      })
      .catch(err => console.log(err));
  }
);

// Mark habit complete
router.patch(
  "/complete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let habitFields = {};
    habitFields.complete = true;

    Habit.findOneAndUpdate(
      { _id: req.body.id },
      { $set: habitFields },
      { new: true }
    )
      .then(habit => {
        res.json(habit);
      })
      .catch(err => console.log(err));
  }
);

// Delete habit by id
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Habit.findById(req.params.id).then(habit => {
      habit.remove().then(() => res.json({ success: true }));
    });
  }
);

module.exports = router;
