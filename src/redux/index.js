import { createStore } from "redux";

const initialState = {
  columns: [],
  rows: [],
  fileName: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COLUMNS": {
      return {
        ...state,
        columns: action.payload
      };
    }
    case "SET_ROWS": {
      return {
        ...state,
        rows: action.payload
      };
    }
    case "SET_FILE_NAME": {
      return {
        ...state,
        fileName: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

const store = createStore(reducer);

export default store;
