import React,  { Component } from 'react';
import List from '../List/List'
import './Board.css'
//import { Link } from 'react-router-dom';

//import { connect } from 'react-redux'


export default class Board extends Component {
    

    render(){
        
        return(
           
             
            <div className = 'boardBackground'>
                <div className = 'boardSubHeader'>
                 <h3 className= 'boardTitle'>Board Title</h3>
                 </div>
                 <div className = 'listsContainer'>
                     <List/>
                     <List/>
                     <List/>
                     <List/>
                </div>
                    
            </div>
        )
    }
}


 