UPDATE cards
  SET card_title = $2,
  description = $3,
  list_id = $4
  WHERE card_id = $1;

SELECT * FROM cards
  WHERE list_id = $4;