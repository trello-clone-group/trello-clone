module.exports = {
    readLists: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.getLists().then(lists => {res.status(200).send(lists)}).catch(err => console.log(err).res.status(500).send(err))
    },
    readListsByBoardID: (req,res) => {
        const dbInstance = req.app.get('db')
        dbInstance.get_lists_by_board_id([req.params.boardID]).then(lists => {res.status(200).send(lists)}).catch(err => console.log(err).res.status(500).send(err))
    },

    createList: (req,res,next) => {
        const dbInstance = req.app.get('db')

        const{list_name, board_id} = req.body
        console.log(list_name, board_id)
        dbInstance.insertList([list_name, board_id])
        .then(() => res.status(200)
        .send()).catch(()=> res.status(500).send())
    },

    deleteList: (req, res, next) => {
        const dbInstance = req.app.get('db')

        dbInstance.removeList([req.params.id])
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send())
    },

    editList:(req, res, next) => {
        const dbInstance = req.app.get('db')

        let {list_name} = req.body;
        dbInstance.editList([req.params.listID, list_name])
        .then(lists => res.status(200).send(lists))
        .catch(err => console.log(err.message))
    }
}