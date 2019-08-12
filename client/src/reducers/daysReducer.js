import { CREATE_DAY,
         GET_DAY,
         GET_DAYS,
         DAY_LOADING,
         DAYS_LOADING,
         GET_TODAY
       } from "../actions/types";

const initialState = {
  days: [],
  day: [],
  dayLoading: false,
  daysLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_DAY:
      return {
        ...state,
        days: [action.payload, ...state.days]
      };
    case GET_DAY:
      return {
        ...state,
        day: action.payload,
        dayLoading: false
      };
    case GET_DAYS:
      return {
        ...state,
        days: action.payload,
        daysLoading: false
      };
      case GET_TODAY:
        return {
          ...state,
          days: action.payload,
          daysLoading: false
        };
    case DAY_LOADING:
      return {
        ...state,
        dayLoading: true
      };
    case DAYS_LOADING:
      return {
        ...state,
        daysLoading: true
      };
    default:
      return state;
  }
}
