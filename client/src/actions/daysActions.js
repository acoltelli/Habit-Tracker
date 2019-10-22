import axios from "axios";
import { CREATE_DAY,
         GET_DAY,
         GET_DAYS,
         DAY_LOADING,
         DAYS_LOADING,
         GET_TODAY
       } from "./types";


// For current day, mark habit complete
export const createDay = dayData => dispatch => {
  axios
    .post("/api/days/createDay", dayData)
    .then(res =>
      dispatch({
        type: CREATE_DAY,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Get day by id
export const getDay = id => dispatch => {
  dispatch(setDayLoading());
  axios
    .get(`/api/days/${id}`)
    .then(res =>
      dispatch({
        type: GET_DAY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DAY,
        payload: null
      })
    );
};

// Get all days for specific user
export const getDays = () => dispatch => {
  dispatch(setDaysLoading());
  axios
    .get("/api/days")
    .then(res =>
      dispatch({
        type: GET_DAYS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DAYS,
        payload: null
      })
    );
};

export const getToday = () => dispatch => {
  // dispatch(setDaysLoading());
  axios
    .get("/api/days/todaysCompleted")
    .then(res =>
      dispatch({
        type: GET_TODAY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TODAY,
        payload: null
      })
    );
};

// Cal data loading
export const setDayLoading = () => {
  return {
    type: DAY_LOADING
  };
};

export const setDaysLoading = () => {
  return {
    type: DAYS_LOADING
  };
};
