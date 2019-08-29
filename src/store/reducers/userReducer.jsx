import {
  ADD_DATA_SUCCESS,
  FETCH_USER_DATA,
  DELETE_USER_DATA
} from "../actions/types";

const initState = {
  data: []
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_DATA_SUCCESS:
      const index = state.data.findIndex(rec => rec.id === action.payload.id);
      let userData;
      if (index > -1) {
        userData = [...state.data];
        userData[index] = action.payload;
      } else {
        userData = state.data.concat(action.payload);
      }

      return {
        ...state,
        data: userData,
        userSaved: true
      };

    case FETCH_USER_DATA:
      const users = {
        ...state,
        userSaved: false
      };
      return users;

    case DELETE_USER_DATA:
      return {
        ...state,
        data: state.data.filter(({ id }) => !action.payload.includes(id))
      };

    default:
      return state;
  }
};

export default userReducer;
