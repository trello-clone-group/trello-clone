INSERT INTO cards (card_title, description, list_id)
  VALUES ($1, $2, $3);

SELECT c.card_id, c.card_title, c.description, c.list_id FROM Boards b
JOIN Lists l
    ON b.board_id = l.board_id
JOIN cards c
    ON l.list_id = c.list_id
WHERE b.board_id = $4