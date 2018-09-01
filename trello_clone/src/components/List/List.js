import React,  { Component } from 'react';
import Axios from 'axios';
import Card from '../Card/Card';
import './List.css';
import { connect } from 'react-redux';
import { changeDisplayModal, changeModalData } from '../../ducks/reducer';
//import { Link } from 'react-router-dom';

class List extends Component {
    constructor(props){
        super(props);

        this.state = {
            listData: {
                list_id: null,
                list_name: '',
                board_id: null
            },
            cardsData: []
        }
    }

    addCard(){
        this.props.changeDisplayModal(true);
        this.props.changeModalData(Object.assign({}, {list_id: this.state.listData.list_id}));
    }

    componentDidMount(){
        let { listId } = this.props;

        Axios.get('/api/lists')
            .then(response => {
                let list = response.data.filter(item => item.list_id === parseInt(listId) );
                this.setState({ listData: list[0] });
            })
        this.getCardData();
    }

    getCardData(){
        let { listId } = this.props;
        Axios.get(`api/cards/${listId}`)
            .then( response => {
                this.setState({ cardsData: response.data });
            })
            .catch( err => console.log(err.message));
    }

    render(){
        let { listData, cardsData } = this.state;
        let { list_name } = listData;

        let cards = cardsData.map((card, i) => <Card key={i} cardId={card.card_id}/>);
        
        return(
           
              <div className = 'listBody'>
                <h3 className = "listTitle">{list_name}</h3>
                { cards }
                <div onClick={() => this.addCard()} className = 'cardBody addCard'>
                    + Add Another Card
                </div>
                </div>
    
             
        )
    }
}

function mapStateToProps(state){
    let { displayModal } = state;
    return {
        displayModal
    }
}

export default connect(mapStateToProps, { changeDisplayModal, changeModalData })(List);