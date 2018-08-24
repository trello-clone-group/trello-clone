let initialState = {
  displayModal: false
};

const CHANGE_DISPLAY_MODAL = "CHANGE_DISPLAY_CARD_MODAL";

export default function reducer(state = initialState, action) {
  switch( action.type ){
    case CHANGE_DISPLAY_MODAL:
      return Object.assign({}, state, { displayModal: action.payload });
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