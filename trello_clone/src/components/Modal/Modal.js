import React, { Component } from 'react';
import './Modal.css';
import { TitleIcon, DescrIcon } from '../Icons/Icons';

const dummyProps = {
  listName: 'Planning / PreCoding MVP',

};

export default class Modal extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: 'Create MVP',
      description: '',
      showInput: true,
      editDescription: false,
      editTitle: false
    }

    
  }

  handleChange(key, val) {
    let obj = {};
    obj[key] = val;
    this.setState( obj );
  }

  edit(key) {
    let obj = {};
    obj[key] = true;
    this.setState( obj );
  }

  saveTitle() {
    this.setState({ editTitle: false });
  }

  cancelEdit() {
    console.log('cancelEdit');
  }

  render(){

    let { title, description, showInput, editDescription, editTitle } = this.state;
    let { listName } = dummyProps;
    
    return (
      <div className="modal-screen" >
        <div className="modal">

          <div className="left">
            <div className="box">
              <TitleIcon />
              <div className="little-box">
                {
                  editTitle
                  ?
                  <div className="title-input">
                    <input type="text" value={title} onChange={ e => this.handleChange('title', e.target.value) }/>
                    <p onClick={ () => this.saveTitle() } >save</p>
                  </div>
                  
                  :
                  <h1 onClick={ () => this.edit('editTitle') }>{title}</h1>
                }
                <p>in list <a href={`#/boards/`}>{listName}</a></p>
              </div>
            </div>
            
            <div className="box">
              <DescrIcon />
              <div className="little-box">
                <div className="description">
                  <h2>Description</h2>
                  <p><a></a></p>
                </div>
                {
                  showInput
                  ?
                  <textarea onClick={ () => this.edit('editDescription') } onChange={ e => this.handleChange('description', e.target.value) } type="text" placeholder="Add a more detailed description..."/>
                  :
                  <p>{description}</p>
                }
                {
                  editDescription
                  ?
                  (
                    <div className="editing">
                      <button className="save-btn btn" onClick={ () => {} }>Save Changes</button>
                      <div className="exit" onClick={ () => {} }>
                        <div className="one short line"></div>
                        <div className="two short line"></div>
                      </div>
                    </div>
                  )
                  :
                  <p></p>
                }
              </div>
            </div>
          </div>

          <div className="right">
            <div className="exit">
              <div className="one long line"></div>
              <div className="two long line"></div>
            </div>
            <button className="btn">Delete Card</button>
          </div>

        </div>
      </div>
    );
  }
}