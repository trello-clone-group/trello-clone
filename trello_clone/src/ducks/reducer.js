let initialState = {
  user_id: null,
  firstName: '',
  lastName: '',
  username: '',
  board_id: null,
  lists: [],
  cards: [],
  displayModal: false,
  modalData: {
    card_id: null,
    card_title: '',
    description: '',
    list_id: null
  }
}

const SET_BOARD_ID = "SET_BOARD_ID",
      CHANGE_DISPLAY_MODAL = "CHANGE_DISPLAY_MODAL",
      CHANGE_MODAL_DATA = "CHANGE_MODAL_DATA",
      INITIALIZE_USER = "INITIALIZE_USER",
      UPDATE_LISTS = "UPDATE_LISTS",
      UPDATE_LIST_ORDER = "UPDATE_LIST_ORDER",
      UPDATE_CARDS = "UPDATE_CARDS",
      UPDATE_CARD_ORDER = "UPDATE_CARD_ORDER";

export default function reducer(state = initialState, action) {
  let { type, payload } = action;
  switch( type ){
    case SET_BOARD_ID:
      return { ...state, board_id: payload }; // untested
    case CHANGE_DISPLAY_MODAL:
      return Object.assign({}, state, { displayModal: action.payload });
    case CHANGE_MODAL_DATA:
      return Object.assign({}, state, { modalData: action.payload });
    case INITIALIZE_USER:
      return { ...state, ...payload };
    case UPDATE_LISTS:
      return { ...state, lists: payload }
    case UPDATE_LIST_ORDER:
      let { oldIndex, newIndex } = payload;
      let newLists = [...state.lists];
      let list = newLists.splice(oldIndex, 1);
      newLists.splice(newIndex, 0, list);
      return { ...state, lists: newLists };
    case UPDATE_CARDS:
      return { ...state, cards: payload };
    case UPDATE_CARD_ORDER:
      let { oldI, newI, listId } = payload;
      let newCards = [...state.cards];
      let card = newCards.splice(oldI, 1);
      card.list_id = listId;
      newCards.splice(newI, 0, card);
      return { ...state, cards: newCards };
    default:
      return state;
  }
}

export function setBoardId(id){ // untested
  return {
    type: SET_BOARD_ID,
    payload: id
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
export function updateLists(lists){
  return {
    type: UPDATE_LISTS,
    payload: lists
  }
}
export function updateListOrder(oldIndex, newIndex){
  return {
    type: UPDATE_LIST_ORDER,
    payload: { oldIndex, newIndex }
  }
}
export function updateCards(cards){
  return {
    type: UPDATE_CARDS,
    payload: cards
  }
}
export function updateCardOrder(oldI, newI, listId){
  return {
    type: UPDATE_CARD_ORDER,
    payload: { oldI, newI, listId }
  }
}

