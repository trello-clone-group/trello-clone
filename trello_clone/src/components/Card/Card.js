import React, { Component } from 'react';
import Axios from 'axios';
import './Card.css';
//import { Link } from 'react-router-dom';

//import { connect } from 'react-redux'


export default class Card extends Component {
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

    render(){
        let { card_title } = this.state.cardData;
        
        return(
           
              <div className='cardWrapper'>
                  <div className='cardBody'>
                    {card_title}
                 </div>
             </div>
        )
    }
}
