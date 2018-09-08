import React, { Component } from 'react';
import Axios from 'axios';
import './Card.css';
import { connect } from 'react-redux';
import { changeDisplayModal, changeModalData } from '../../ducks/reducer';
//import { connect } from 'react-redux'


class Card extends Component {
    constructor(props){
        super(props);

        this.state = {
            cardData: {
                card_id: null,
                card_title: '',
                description: '',
                list_id: null
            }
        }
    }

    componentDidMount(){
        let { cardsData, cardId } = this.props;
        let cardData = cardsData.find(card => card.card_id === cardId);
        this.setState({ cardData: cardData });
    }

    displayModal(){
        let { cardData } = this.state;
        let listData = this.props.lists.find(list => list.list_id === cardData.list_id);
        cardData.list_title = listData.list_name;
        this.props.changeModalData( cardData );
        this.props.changeDisplayModal( true );
    }

    render(){
        let { card_title } = this.state.cardData;
        
        return(
           
              <div onClick={() => this.displayModal() } className='cardWrapper'>
                  <div className='cardBody'>
                    {card_title}
                 </div>
             </div>
        )
    }
}

function mapStateToProps(state){
    let { displayModal, cardsData, lists } = state;
    return {
        displayModal,
        cardsData,
        lists
    };
}

export default connect(mapStateToProps, { changeDisplayModal, changeModalData })(Card);