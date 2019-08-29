import {
  ADD_USER_DATA,
  ADD_DATA_SUCCESS,
  FETCH_USER_DATA,
  DELETE_USER_DATA
} from "./types";

const uuidv4 = () => {
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const addUser = userData => dispatch => {
  console.log(userData);
  if (userData) {
    userData.id = userData.id || uuidv4();
    dispatch({
      type: ADD_DATA_SUCCESS,
      payload: userData
    });
  }
};

export const fetchUsers = () => {
  return {
    type: FETCH_USER_DATA
  };
};

export const deleteUsers = ids => {
  return {
    type: DELETE_USER_DATA,
    payload: ids
  };
};
