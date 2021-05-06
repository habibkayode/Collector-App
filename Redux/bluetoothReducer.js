import * as TYPES from "./types";
let initialState = {
  bluetoothConneted: false,
  bondedList: undefined,
  discovering: false,
  discoverList: [],
  selectedDevice: undefined,
  connected: false,
  bluetoothMessages: "",
  bluetoothStatus: "",
};

const bluetoothReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.BLESTATUSTYPE:
      return {
        ...state,
        bluetoothStatus: action.payload,
      };

    case TYPES.BLEMESSAGETYPE:
      return {
        ...state,
        bluetoothMessages: action.payload,
      };

    case TYPES.UPDATEBLUETOOTHSTATE:
      return {
        ...state,
        bluetoothConneted: action.payload,
      };

    case TYPES.BONDEDTYPE:
      return {
        ...state,
        bondedList: action.payload,
      };

    case TYPES.DISCOVERINGTYPE:
      return {
        ...state,
        discovering: action.payload,
      };

    case TYPES.DISCOVERLISTYPE:
      return {
        ...state,
        discoverList: action.payload,
      };

    case TYPES.UPDATESELECTEDTYPE:
      return {
        ...state,
        selectedDevice: action.payload,
      };

    case TYPES.CONNECTEDTYPE:
      return {
        ...state,
        connected: action.payload,
      };

    default:
      return state;
  }
};

export default bluetoothReducer;
