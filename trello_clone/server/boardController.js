module.exports = {
  // Create Board
  createBoard: (req, res) => {
    console.log("Creating a new board...");
    const db = req.app.get("db");
    const { board_name, user_id } = req.body;
    //const user_id = req.session.user_id;

    console.log(board_name, user_id);
    db.createBoard([board_name, user_id])
      .then(board => {
        res.status(200).send(board);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  readBoard: (req, res) => {
    console.log("Fetching board...");
  },
  updateBoard: (req, res) => {
    console.log("Updating board...");
  },
  deletingBoard: (req, res) => {
    console.log("Deleting board...");
  }
};
