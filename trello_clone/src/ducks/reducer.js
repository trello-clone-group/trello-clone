import axios from 'axios'

///// INITIAL STATE /////
let initialState = {
  user_id: null,
  firstName: "",
  lastName: "",
  username: "",
  board_id: null,
  board_name: '',
  color: '',
  lists:[],
  listsThunk: {
    isFetching: true,
    error: null,
    data: []
  },
  cards: {
    isFetching: true,
    error: null,
    data: []
  },
  cardsData: [],
  displayModal: false,
  modalData: {
    card_id: null,
    card_title: "",
    description: "",
    list_id: null,
    list_title: ''
  }
};


const LOGOUT = "LOGOUT",
      CHANGE_BOARD_COLOR = "CHANGE_BOARD_COLOR",
      UPDATE_BOARD_ID = "UPDATE_BOARD_ID",
      CHANGE_DISPLAY_MODAL = "CHANGE_DISPLAY_MODAL",
      CHANGE_MODAL_DATA = "CHANGE_MODAL_DATA",
      INITIALIZE_USER = "INITIALIZE_USER",
      UPDATE_LISTS = "UPDATE_LISTS",
      UPDATE_LIST_ORDER = "UPDATE_LIST_ORDER",
      UPDATE_CARDS = "UPDATE_CARDS",
      UPDATE_CARD_ORDER = "UPDATE_CARD_ORDER",
      GET_CARDS_REQUEST = "GET_CARDS_REQUEST",
      GET_CARDS_FAILURE = "GET_CARDS_FAILURE",
      GET_CARDS_SUCCESS = "GET_CARDS_SUCCESS",
      GET_LISTS_REQUEST = "GET_LISTS_REQUEST",
      GET_LISTS_FAILURE = "GET_LISTS_FAILURE",
      GET_LISTS_SUCCESS = "GET_LISTS_SUCCESS",
      UPDATE_BOARD_NAME = "UPDATE_BOARD_NAME";


export default function reducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case UPDATE_BOARD_ID:
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
    case UPDATE_LISTS:
      return { ...state, lists: payload }
    case UPDATE_LIST_ORDER:
      let { oldIndex, newIndex } = payload;
      let newLists = [...state.lists];
      let list = newLists.splice(oldIndex, 1);
      newLists.splice(newIndex, 0, list);
      return { ...state, lists: newLists };
    case UPDATE_CARDS:
      return { ...state, cardsData: payload };
    case UPDATE_CARD_ORDER:
      let { oldI, newI, listId } = payload;
      let newCards = [...state.cards];
      let card = newCards.splice(oldI, 1);
      card.list_id = listId;
      newCards.splice(newI, 0, card);
      return { ...state, cards: newCards };
    case GET_LISTS_REQUEST:
         case GET_LISTS_FAILURE:
              return {...state, listsThunk: {isFetching: action.isFetching, error: action.error}}
         case GET_LISTS_SUCCESS:
              return {...state, listsThunk: {isFetching: action.isFetching, error: action.error, data: action.payload}}
    case GET_CARDS_REQUEST:
         case GET_CARDS_FAILURE:
              return {...state, cards: {isFetching: action.isFetching, error: action.error }}
         case GET_CARDS_SUCCESS:
              return {...state, cards: {isFetching: action.isFetching, error: action.error, data: action.payload }}
    case UPDATE_BOARD_NAME:
      return { ...state, board_name: payload }
    default:
      return state;
  }
}


export function getCards(board_id) {
  return function(dispatch){
   // console.log('getCards fired', board_id)
    dispatch({type: GET_CARDS_REQUEST, isFetching: true, error: null})
    axios.get(`http://localhost:3005/api/cardbyboard/${board_id}`)
    .then(res => {
      dispatch({type: GET_CARDS_SUCCESS, isFetching: false, payload: res.data})
      
    })
    .catch(error => {
      dispatch({type: GET_CARDS_FAILURE, isFetching: false, error: error})
      console.log("Failure: ", error)
    })
  }
}

export function getLists(board_id) {
  return function(dispatch){
   // console.log('getListsFired', board_id)
    dispatch({type: GET_LISTS_REQUEST, isFetching: true, error: null})
    axios.get(`http://localhost:3005/api/listsByBoard/${board_id}`)
    .then(res => {
      dispatch({type: GET_LISTS_SUCCESS, isFetching: false, payload: res.data})
      
    })
    .catch(error => {
      dispatch({type: GET_LISTS_FAILURE, isFetching: false, error: error})
      console.log("Failure: ", error)
    })
  }
}


export function updateBoardId(id){ // untested
  return {
    type: UPDATE_BOARD_ID,
    payload: id
  };
}


export function changeDisplayModal(bool){
  return {
    type: CHANGE_DISPLAY_MODAL,
    payload: bool
  };
}




export function changeModalData(data){
  return {
    type: CHANGE_MODAL_DATA,
    payload: data
  };
}

export function initializeUser(userData){
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
    payload: color
  };
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

export function updateBoardName(name){
  return {
    type: UPDATE_BOARD_NAME,
    payload: name
  };
}