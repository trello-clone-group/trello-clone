module.exports = {
  // GET "/api/card/:id" - get cards by card id
  readCard: (req, res, next) => { // use with Modal component
    const db = req.app.get('db');
    let  { id } = req.params;
    db.get_card([id])
      .then(card => {
        res.status(200).send(card);
      })
      .catch( err => console.log(err.message));
  },
  
  // GET "/api/cards/:id" - get cards by list id
  readCardsByList: (req, res, next) => { // use with List component
    const db = req.app.get('db');
    let { id } = req.params;
    db.get_cards_by_list([id])
      .then( cards => {
        res.status(200).send(cards);
      })
      .catch( err => console.log(err.messsage));
  },
  
  // GET "/api/cardbyboard/:id" - get cards by board id
  readCardByBoard: (req, res, next) => {
    const db = req.app.get('db')
    let { id } = req.params
    db.get_cards_by_board([id])
      .then(cards => {
        res.status(200).send(cards)
      })
      .catch( err => console.log(err.message))
  },
  
  // POST "/api/card" - makes new card and sends back all cards from the same list
  createCard: (req, res, next) => {
    const db = req.app.get('db');
    let { card_title, description, list_id, board_id } = req.body;
    if (!description){
      description = '';
    }
    db.create_card([card_title, description, list_id, board_id])
    .then( cards => {
        res.status(200).send(cards);
      })
      .catch( err => console.log(err.message));
  },
  
  // PUT "/api/card/:id" -  edits card w/ given id and sends back cards from same board
  editCard: (req, res, next) => {
    const db = req.app.get('db');
    let { card_title, description, list_id, board_id } = req.body;
    let { id } = req.params;
    db.edit_card([id, card_title, description, list_id, board_id])
      .then( cards => res.status(200).send(cards) )
      .catch( err => console.log(err.message));
  },
  
  // DELETE "/api/card/:id" -  deletes card w/ given id
  deleteCard: (req, res) => {
    const db = req.app.get('db');
    let { id } = req.params;
    db.delete_card([id])
      .then( cards => res.status(200).send(cards) )
      .catch( err => console.log(err.message));
  },
};
