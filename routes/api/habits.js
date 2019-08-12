const express = require("express");
const router = express.Router();
const passport = require("passport");
const Habit = require("../../models/Habit");


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
    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    const NEW_HABIT = await new Habit({
      owner: OWNER,
      name: req.body.habitName
    });

    NEW_HABIT.save().then(habit => res.json(habit));
  }
);


// Edit habit name
router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let habitFields = {};
    habitFields.name = req.body.editName;

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


// Set all habits in table complete to false, for testing
router.patch(
  "/setFalse",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let habitFields = {};
    habitFields.complete = false;

    Habit.updateMany(
      { $set: habitFields },
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
