module.exports = {
  // Create Board
  createBoard: (req, res) => {
    console.log("Creating a new board...");
    const db = req.app.get("db");
    const { board_name, user_id } = req.body;
    //const user_id = req.session.user_id;
    const defaultBoardColor = "dodgerblue"; // "lightgray";
    db.createBoard([board_name, user_id, defaultBoardColor, user_id])
      .then(board_id => {
        console.log(board_id);
        res.status(201).send(board_id[0]);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  readBoardByBoardId: (req, res) => {
    console.log(`Fetching board ${req.params.id}...`);
    const db = req.app.get("db");
    db.readBoardByBoardId([req.params.id])
      .then(board => {
        res.status(200).send(board);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  readBoardsByUserId: (req, res) => {
    console.log(`Fetching user ${req.params.id} boards...`);
    const db = req.app.get("db");
    db.readBoardsByUserId([req.params.id])
      .then(boards => {
        res.status(200).send(boards);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  updateBoard: (req, res) => {
    console.log(`Updating board ${req.params.id}...`);
    const db = req.app.get("db");
    const { board_name } = req.body;
    db.updateBoard([board_name, req.params.id])
      .then(board => {
        res.status(200).send(board);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  deleteBoard: (req, res) => {
    console.log(`Deleting board ${req.params.id}...`);
    const db = req.app.get("db");

    db.deleteBoard([req.params.id])
      .then(board => {
        res.status(202).send(board);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  }
};
