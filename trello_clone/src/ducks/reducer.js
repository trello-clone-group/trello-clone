let initialState = {
  user_id: null,
  firstName: "",
  lastName: "",
  username: "",
  board_id: null,
  lists: [],
  cards: [],
  displayModal: false,
  modalData: {
    card_id: null,
    card_title: "",
    description: "",
    list_id: null
  }
};

const CHANGE_DISPLAY_MODAL = "CHANGE_DISPLAY_MODAL";
const CHANGE_MODAL_DATA = "CHANGE_MODAL_DATA";
const INITIALIZE_USER = "INITIALIZE_USER";
const LOGOUT = "LOGOUT";
const CHANGE_BOARD_COLOR = "CHANGE_BOARD_COLOR";

export default function reducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case SET_BOARD_ID:
      return { ...state, board_id: payload }; // untested
    case CHANGE_DISPLAY_MODAL:
      return Object.assign({}, state, { displayModal: action.payload });
    case CHANGE_MODAL_DATA:
      return Object.assign({}, state, { modalData: action.payload });
    case INITIALIZE_USER:
      return { ...state, ...payload };
    case LOGOUT:
      return initialState;
    case CHANGE_BOARD_COLOR:
      return { ...state, ...payload };
    default:
      return state;
  }
}
export function setBoardId(id) {
  // untested
  return {
    type: SET_BOARD_ID,
    payload: id
  };
}
export function changeDisplayModal(bool) {
  return {
    type: CHANGE_DISPLAY_MODAL,
    payload: bool
  };
}
export function changeModalData(data) {
  return {
    type: CHANGE_MODAL_DATA,
    payload: data
  };
}
export function initializeUser(userData) {
  return {
    type: INITIALIZE_USER,
    payload: userData
  };
}

// Phil's Action Creators
// should be used in header component
export function logout() {
  return {
    type: LOGOUT
  };
}

export function changeBoardColor(color) {
  return {
    type: CHANGE_BOARD_COLOR,
    paylod: color
  };
}
