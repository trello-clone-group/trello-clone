// Unit tests by Phillip Sun
const reducerFunctions = require("../src/ducks/reducer");

test("Logout reducer function should not have return a payload", () => {
  expect(reducerFunctions.logout().payload).toEqual(undefined);
});

test("Update cards reducer function should return a payload object", () => {
  expect(
    reducerFunctions.updateCards({ card_name: "my card", card_id: 0 })
  ).toEqual({
    type: "UPDATE_CARDS",
    payload: { card_id: 0, card_name: "my card" }
  });
});

test("Update board name reducer function should send the new name as the payload", () => {
  expect(reducerFunctions.updateBoardName("New Board Name").payload).toEqual(
    "New Board Name"
  );
});

test("Update board name reducer function should send UPDATE_BOARD_NAME as type", () => {
  expect(reducerFunctions.updateBoardName("New Board Name").type).toEqual(
    "UPDATE_BOARD_NAME"
  );
});

test("Update lists reducer function should send UPDATE_LISTS as type", () => {
  expect(
    reducerFunctions.updateLists({ listid: 1, listname: "list 1" }).type
  ).toEqual("UPDATE_LISTS");
});
