import axios from "axios";

///// INITIAL STATE /////
const initialState = {
  user_id: null,
  first_name: "",
  last_name: "",
  username: "",
  board_id: null,
  board_name: "",
  color: "",
  boards: [],
  lists: [],
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
    list_title: ""
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
  UPDATE_CARD = "UPDATE_CARD", // to make
  UPDATE_CARD_ORDER = "UPDATE_CARD_ORDER",
  GET_CARDS_REQUEST = "GET_CARDS_REQUEST",
  GET_CARDS_FAILURE = "GET_CARDS_FAILURE",
  GET_CARDS_SUCCESS = "GET_CARDS_SUCCESS",
  UPDATE_BOARDS = "UPDATE_BOARDS",
  CREATE_BOARD = "CREATE_BOARD",
  UPDATE_BOARD_NAME = "UPDATE_BOARD_NAME",
  DROP_LIST = "DROP_LIST";

export default function reducer(state = initialState, action) {
  console.log('reducer', action);
  let { type, payload } = action;
  switch (type) {
    case UPDATE_BOARD_ID:
      return { ...state, board_id: payload };
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
      return { ...state, lists: payload };
    case DROP_LIST:
      let currentLists = [...state.lists]
      currentLists.splice(currentLists.findIndex(list => list.list_id === payload), 1)
      return {...state, lists: currentLists}
      
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
    case UPDATE_CARD:
      let updatedCards = [...state.cardsData];
      let index = updatedCards.findIndex(card => card.card_id === state.modalData.card_id);
      updatedCards[index] = {...state.modalData};
      console.log(updatedCards === state.cardsData);
      return { ...state, cardsData: updatedCards };
    case GET_CARDS_REQUEST:
    case GET_CARDS_FAILURE:
      return {
        ...state,
        cards: { isFetching: action.isFetching, error: action.error }
      };
    case GET_CARDS_SUCCESS:
      return {
        ...state,
        cards: { isFetching: action.isFetching, error: action.error }
      };
    case UPDATE_BOARD_NAME:
      return { ...state, board_name: payload };
    case UPDATE_BOARDS:
      return { ...state, boards: payload };
    case CREATE_BOARD:
      let newBoards = [...state.boards, payload]
      return { ...state, boards: newBoards };
    default:
      return state;
  }
}

export function getCards(board_id) {
  return function (dispatch) {
    dispatch({ type: GET_CARDS_REQUEST, isFetching: true, error: null });
    axios
      .get(`http://localhost:3005/api/cardbyboard/${board_id}`)
      .then(res => {
        dispatch({
          type: GET_CARDS_SUCCESS,
          isFetching: false,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({ type: GET_CARDS_FAILURE, isFetching: false, error: error });
        console.log("Failure: ", error);
      });
  };
}
export function dropList(id){
  return {
    type: DROP_LIST,
    payload: id
  }
}

export function updateBoardId(id) {
  return {
    type: UPDATE_BOARD_ID,
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

export function updateLists(lists) {
  return {
    type: UPDATE_LISTS,
    payload: lists
  };
}

export function updateListOrder(oldIndex, newIndex) {
  return {
    type: UPDATE_LIST_ORDER,
    payload: { oldIndex, newIndex }
  };
}

export function updateCards(cards) {
  return {
    type: UPDATE_CARDS,
    payload: cards
  };
}

export function updateCard(data){
  return {
    type: UPDATE_CARD,
    payload: data
  };
}

export function updateCardOrder(oldI, newI, listId) {
  return {
    type: UPDATE_CARD_ORDER,
    payload: { oldI, newI, listId }
  };
}

export function updateBoardName(name) {
  return {
    type: UPDATE_BOARD_NAME,
    payload: name
  };
}

export function updateBoards(boards) {
  return {
    type: UPDATE_BOARDS,
    payload: boards
  }
}

export function createBoard(board) {
  return {
    type: CREATE_BOARD,
    payload: board
  }
}