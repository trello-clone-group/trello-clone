const reducerFunctions = require('../src/ducks/reducer');

// Dalton
test('action creators', () => {
    expect(reducerFunctions.updateBoardId(10).payload).toEqual(10)
    expect(reducerFunctions.dropList(6).payload).toEqual(6)
    expect(reducerFunctions.changeDisplayModal(true).payload).toEqual(true)
    expect(reducerFunctions.initializeUser({user_id: 6, username: "Billy"}).payload).toEqual({user_id: 6, username:"Billy"})
    expect(reducerFunctions.changeBoardColor('Purple').payload).toEqual('Purple')
})

// Jared
const board = { board_id: 1, board_name: "example board", user_id: 15, color: "green" };
const data = { card_id: 15, card_title: "example card", description: "just an example", list_id: 12, list_title: "example list title" };
const boards = [
    { board_id: 2, board_name: "example board 1", user_id: 3, color: "green" },
    { board_id: 3, board_name: "example board 2", user_id: 3, color: "blueviolet" },
    { board_id: 4, board_name: "example board 3", user_id: 3, color: "orange" }
];
test('action creators Jared', () => {
    expect(reducerFunctions.createBoard(board).payload).toEqual(board);
    expect(reducerFunctions.updateCardOrder(1, 2, 3).payload).toEqual({oldI: 1, newI: 2, listId: 3});
    expect(reducerFunctions.updateListOrder(15, 4).payload).toEqual({oldIndex: 15, newIndex: 4});
    expect(reducerFunctions.changeModalData(data).payload).toEqual(data)
    expect(reducerFunctions.updateBoards(boards).payload).toEqual(boards)
});