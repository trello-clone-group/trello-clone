INSERT INTO boards (board_name, user_id, color) VALUES ($1, $2, $3);

Select board_id from boards where user_id = $4 and board_id in (select max(board_id) from boards);