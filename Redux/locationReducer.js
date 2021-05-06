import * as TYPES from "./types";
let initialState = {
  coordinate: {},
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.LATLNG_TYPE:
      return {
        ...state,
        coordinate: action.payload,
      };

    default:
      return state;
  }
};

export default locationReducer;
