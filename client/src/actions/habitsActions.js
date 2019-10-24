import axios from "axios";
import {
  CREATE_HABIT,
  UPDATE_HABIT,
  COMPLETE_HABIT,
  DELETE_HABIT,
  GET_HABIT,
  HABIT_LOADING,
  GET_HABITS,
  GET_COMPLETED_HABITS,
  HABITS_LOADING
} from "./types";



// Create Habit
export const createHabit = habitData => dispatch => {
  axios
    .post("/api/habits/create", habitData)
    .then(res =>
      dispatch({
        type: CREATE_HABIT,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Update Habit
export const updateHabit = habitData => dispatch => {
  axios
    .patch("/api/habits/update", habitData)
    .then(res =>
      dispatch({
        type: UPDATE_HABIT,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Complete Habit
export const completeHabit = habitData => dispatch => {
  axios
    .patch("/api/habits/complete", habitData)
    .then(res =>
      dispatch({
        type: COMPLETE_HABIT,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Delete habit
export const deleteHabit = id => dispatch => {
  axios
    .delete(`/api/habits/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_HABIT,
        payload: id
      })
    )
    .catch(err => console.log(err));
};

// Get habit by id
export const getHabit = id => dispatch => {
  dispatch(setHabitLoading());
  axios
    .get(`/api/habits/${id}`)
    .then(res =>
      dispatch({
        type: GET_HABIT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_HABIT,
        payload: null
      })
    );
};

// Get all habits for specific user
export const getHabits = () => dispatch => {
  // dispatch(setHabitsLoading());
  axios
    .get("/api/habits")
    .then(res =>
      dispatch({
        type: GET_HABITS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_HABITS,
        payload: null
      })
    );
};

// Get completed habits for specific user
export const getCompletedHabits = () => dispatch => {
  // dispatch(setHabitsLoading());
  axios
    .get("/api/habits/completedHabits")
    .then(res =>
      dispatch({
        type: GET_COMPLETED_HABITS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COMPLETED_HABITS,
        payload: null
      })
    );
};

// Habit loading
export const setHabitLoading = () => {
  return {
    type: HABIT_LOADING
  };
};

// Habits loading
export const setHabitsLoading = () => {
  return {
    type: HABITS_LOADING
  };
};
