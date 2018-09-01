let initialState = {
  displayModal: false,
  modalData: {
    card_id: null,
    card_title: '',
    description: '',
    list_id: null
  },
  user_id: null,
  username: '',
  firstName: '',
  lastName: ''
};

const CHANGE_DISPLAY_MODAL = "CHANGE_DISPLAY_CARD_MODAL";
const CHANGE_MODAL_DATA = "CHANGE_MODAL_DATA";
const INITIALIZE_USER = "INITIALIZE_USER";

export default function reducer(state = initialState, action) {
  let { type, payload } = action;
  switch( type ){
    case CHANGE_DISPLAY_MODAL:
      return Object.assign({}, state, { displayModal: action.payload });
    case CHANGE_MODAL_DATA:
      return Object.assign({}, state, { modalData: action.payload });
    case INITIALIZE_USER:
      return { ...state, ...payload };
    default:
      return state;
  }
}

export function changeDisplayModal(bool){
  return {
    type: CHANGE_DISPLAY_MODAL,
    payload: bool
  }
}
export function changeModalData(data){
  return {
    type: CHANGE_MODAL_DATA,
    payload: data
  }
}
export function initializeUser(userData){
  return {
    type: INITIALIZE_USER,
    payload: userData
  }
}
