import React,  { Component } from 'react';
import Card from '../Card/Card'
import './List.css'
//import { Link } from 'react-router-dom';

//import { connect } from 'react-redux'


export default class List extends Component {

    render(){
        
        return(
           
              <div className = 'listBody'>
                <Card/>
                <Card/>
                <Card/>
                    
                </div>
    
             
        )
    }
}
