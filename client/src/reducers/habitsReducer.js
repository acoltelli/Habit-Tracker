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
} from "../actions/types";

const initialState = {
  habits: [],
  habit: [],
  habitLoading: false,
  habitsLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_HABIT:
      return {
        ...state,
        habits: [action.payload, ...state.habits]
      };
    case UPDATE_HABIT:
      let index = state.habits.findIndex(
        habit => habit._id === action.payload._id
      );
      state.habits.splice(index, 1);
      return {
        ...state,
        habits: [action.payload, ...state.habits]
      };
    case COMPLETE_HABIT:
    let i = state.habits.findIndex(
      habit => habit._id === action.payload._id
    );
    state.habits.splice(i, 1);
    return {
      ...state,
      habits: [action.payload, ...state.habits]
    };
    case DELETE_HABIT:
      return {
        ...state,
        habits: state.habits.filter(
          habit => habit._id !== action.payload
        )
      };
    case GET_HABIT:
      return {
        ...state,
        habit: action.payload,
        habitLoading: false
      };
    case GET_COMPLETED_HABITS:
      return {
        ...state,
        habits: action.payload,
        habitsLoading: false
      };
    case GET_HABITS:
      return {
        ...state,
        habits: action.payload,
        habitsLoading: false
      };
    case HABIT_LOADING:
      return {
        ...state,
        habitLoading: true
      };
    case HABITS_LOADING:
      return {
        ...state,
        habitsLoading: true
      };
    default:
      return state;
  }
}
