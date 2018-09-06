import axios from 'axios'

///// INITIAL STATE /////
let initialState = {
  user_id: null,
  firstName: '',
  lastName: '',
  username: '',
  board_id: null,
  lists: [],
  cards: {isFetching: true, error: null, data:[]},
  displayModal: false,
  modalData: {
    card_id: null,
    card_title: '',
    description: '',
    list_id: null
  }
}

///// ACTION CONSTANTS /////

const CHANGE_DISPLAY_MODAL = "CHANGE_DISPLAY_MODAL";
const CHANGE_MODAL_DATA = "CHANGE_MODAL_DATA";
const INITIALIZE_USER = "INITIALIZE_USER";
const SET_BOARD_ID = "SET_BOARD_ID"

const GET_CARDS_REQUEST = "GET_CARDS_REQUEST"
const GET_CARDS_FAILURE = "GET_CARDS_FAILURE"
const GET_CARDS_SUCCESS = "GET_CARDS_SUCCESS"


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
    case GET_CARDS_REQUEST:
         case GET_CARDS_FAILURE: 
              return {...state, cards: {isFetching: action.isFetching, error: action.error}}
         case GET_CARDS_SUCCESS:
              return {...state, cards: {isFetching: action.isFetching, error: action.error, }}
    default:
      return state;
  }
}

export function getCards(board_id) {
  return function(dispatch){
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
