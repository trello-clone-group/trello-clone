import React,  { Component } from 'react';
import Axios from 'axios';
import Card from '../Card/Card';
import './List.css';
//import { Link } from 'react-router-dom';

//import { connect } from 'react-redux'


export default class List extends Component {
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

    componentDidMount(){
        let { listId } = this.props;

        Axios.get('/api/lists')
            .then(response => {
                let list = response.data.filter(item => item.list_id == listId );
                this.setState({ listData: list[0] });
            })

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
                <h3>{list_name}</h3>
                { cards }
                </div>
    
             
        )
    }
}
