module.exports = {
  readCard: (req, res, next) => { // use with Modal component
    const db = req.app.get('db');
    let  { id } = req.params;
    db.get_card([id])
      .then(card => {
        res.status(200).send(card);
      })
      .catch( err => console.log(err.message));
  },
  readCardsByList: (req, res, next) => { // use with List component
    const db = req.app.get('db');
    let { id } = req.params;
    db.get_cards_by_list([id])
      .then( cards => {
        res.status(200).send(cards);
      })
      .catch( err => console.log(err.messsage));
  },
  createCard: (req, res, next) => {
    const db = req.app.get('db');
    let { card_title, description, list_id } = req.body;
    db.create_card([card_title, description, list_id])
      .then( cards => {
        res.status(200).send(cards);
      })
      .catch( err => console.log(err.message));
  },
  editCard: (req, res, next) => {
    const db = req.app.get('db');
    let { card_title, description, list_id } = req.body;
    let { id } = req.params;
    db.edit_card([id, card_title, description, list_id])
      .then( cards => res.status(200).send(cards) )
      .catch( err => console.log(err.message));
  },
  deleteCard: (req, res, next) => {
    const db = req.app.get('db');
    let { id } = req.params;
    db.delete_card([id])
      .then( () => res.status(200).send("card deleted") )
      .catch( err => console.log(err.message));
  },
};
