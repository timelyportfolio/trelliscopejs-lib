import {
  SET_TABLE
} from '../constants';

const table = (state = false, action) => {
  switch (action.type) {
    case SET_TABLE:
      return action.isTable;
    default:
  }
  return state;
};

export default table;