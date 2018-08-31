import React, { Component } from 'react';
import Axios from 'axios';
import './Card.css';
import { connect } from 'react-redux';
import { changeDisplayModal, changeModalData } from '../../ducks/reducer';
//import { Link } from 'react-router-dom';

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
        let { cardId } = this.props;

        Axios.get(`/api/card/${cardId}`)
            .then( response => {
                this.setState({ cardData: response.data[0] });
            })
            .catch( err => console.log(err.message));
    }

    displayModal(){
        this.props.changeModalData( this.state.cardData );
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
    let { displayModal } = state;
    return {
        displayModal
    };
}

export default connect(mapStateToProps, { changeDisplayModal, changeModalData })(Card);