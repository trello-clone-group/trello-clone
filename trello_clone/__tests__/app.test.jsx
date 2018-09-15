const reducerFunctions = require('../src/ducks/reducer')

test('action creators', () => {
    expect(reducerFunctions.updateBoardId(10).payload).toEqual(10)
    expect(reducerFunctions.dropList(6).payload).toEqual(6)
    expect(reducerFunctions.changeDisplayModal(true).payload).toEqual(true)
    expect(reducerFunctions.initializeUser({user_id: 6, username: "Billy"}).payload).toEqual({user_id: 6, username:"Billy"})
    expect(reducerFunctions.changeBoardColor('Purple').payload).toEqual('Purple')
})