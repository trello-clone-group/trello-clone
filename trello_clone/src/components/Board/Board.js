import React,  { Component } from 'react';
import List from '../List/List'
import Axios from 'axios';
import './Board.css'
//import { Link } from 'react-router-dom';

//import { connect } from 'react-redux'


export default class Board extends Component {
    constructor(props){
        super(props);

        this.state = {
            listsData: [],
            boardData: {
                board_id: null,
                board_name: '',
                user_id: null,
                color: ''
            }
        }
    }
    
    componentDidMount(){
        let { id } = this.props.match.params;

        // get boardData
        Axios.get(`/api/board/${ id }`)
            .then( response => {
                this.setState({ boardData: response.data[0] });
            })
            .catch( err => err.message );
        
        // get listData
        Axios.get(`/api/lists/`)
            .then( response => {
                let lists = response.data.filter(list => list.board_id == id);
                this.setState({ listsData: lists });
            })
            .catch( err => err.message );
    }

    render(){

        let { listsData, boardData } = this.state;
        let { board_name, color } = boardData;

        let lists = listsData.map((list, i) => {
            return <List key={i} listId={list.list_id} />
        })
        
        return(
             
            <div className='boardBackground' /*style={{backgroundColor: color}}*/>
                <div className='boardSubHeader' /*style={{backgroundColor: color}}*/>
                 <h2 className='boardTitle'>{board_name}</h2>
                 </div>
                 <div className='listsContainer'>
                     { lists }
                <div className = 'listBody newList'>
                   + Add Another List 
                </div>
                </div>
                    
            </div>
        )
    }
}


 