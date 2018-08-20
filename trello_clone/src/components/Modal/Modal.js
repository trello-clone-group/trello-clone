import React, { Component } from 'react';
import './Modal.css';
import { TitleIcon, DescrIcon } from '../Icons/Icons';

const dummyProps = {
  listName: 'Planning / PreCoding MVP'
};

export default class Modal extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: 'Create MVP',
      description: ''
    }
  }

  render(){

    let { title, description } = this.state;
    let { listName } = dummyProps;
    
    return (
      <div className="modal">
        <TitleIcon />
        <h1>{title}</h1>
        <p>in list <a>{listName}</a></p>

        <DescrIcon />
        <h2>Description</h2>
        <input type="text" placeholder="Add a more detailed description"/>

        <button>Delete Card</button>

      </div>
    );
  }
}