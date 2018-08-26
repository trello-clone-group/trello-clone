INSERT INTO cards (card_title, description, list_id)
  VALUES ($1, $2, $3);

SELECT * FROM cards
  WHERE list_id = $3;