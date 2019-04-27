import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeDisplayModal, changeModalData } from '../../ducks/reducer';

// Style Imports
import './Card.css';

class Card extends Component {

  componentDidMount(){
    let { cardsData, cardId } = this.props;
    let cardData = cardsData.find(card => card.card_id === cardId);
    this.setState({ cardData: cardData });
  }

  getCardData() {
    let { cardsData, cardId } = this.props;
    let card = cardsData.find(card => {
      return card.card_id === cardId;
    } );
    return card;
  }

  displayModal(){
    let cardData = this.getCardData();
    let listData = this.props.lists.find(list => list.list_id === cardData.list_id);
    cardData.list_title = listData.list_name;
    this.props.changeModalData( cardData );
    this.props.changeDisplayModal( true );
  }

  render() {
    let cardData = this.getCardData();
    let { card_title } = cardData;

    return (
      <div onClick={() => this.displayModal()} className='cardWrapper'>
        <div className='cardBody'>
          {card_title}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let { displayModal, cardsData, lists } = state;
  return {
    cardsData,
    lists,
    displayModal
  };
}

export default connect(mapStateToProps, { changeDisplayModal, changeModalData })(Card);