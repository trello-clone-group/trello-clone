UPDATE cards
  SET card_title = $2,
  description = $3,
  list_id = $4
  WHERE card_id = $1;

SELECT c.card_id, c.card_title, c.description, c.list_id FROM Boards b
JOIN Lists l
    ON b.board_id = l.board_id
JOIN cards c
    ON l.list_id = c.list_id
WHERE b.board_id = $5;