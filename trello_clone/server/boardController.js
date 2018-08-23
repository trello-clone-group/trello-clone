module.exports = {
  // Create Board
  createBoard: (req, res, next) => {
    console.log("Creating a new board...");
    const db = req.app.get("db");
    const { board_name, user_id } = req.body;
    //const user_id = req.session.user_id;
    db.createBoard([board_name, user_id])
      .then(board => {
        res.status(200).send(board);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  readBoard: (req, res, next) => {
    console.log("Fetching board by id...");
    const db = req.app.get("db");
    db.readBoard([req.params.id])
      .then(board => {
        res.status(200).send(board);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  readBoardsByUserId: (req, res, next) => {
    console.log("Fetching user boards...");
    const db = req.app.get("db");
    db.readBoardsByUserId([req.params.id])
      .then(boards => {
        res.status(200).send(boards);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  updateBoard: (req, res, next) => {
    console.log("Updating board...");
  },
  deletingBoard: (req, res, next) => {
    console.log("Deleting board...");
  }
};
