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
      prevDescription: '',
      editDescription: false,
      editTitle: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.edit = this.edit.bind(this);
  }

  handleChange(key, val) {
    let obj = {};
    obj[key] = val;
    this.setState( obj );
  }

  edit(key) {
    let obj = {};
    obj[key] = true;
    if (key === "editDescription") {
      let desc = this.state.description;
      this.setState({
        prevDescription: desc,
        editDescription: true
      });
    } else {
      this.setState( obj );
    }
  }

  save(key) {
    let obj = {};
    obj[key] = false;
    this.setState( obj );
  }

  cancelEdit() {
    console.log('cancelEdit');
    let desc = this.state.prevDescription;
    this.setState({
      editDescription: false,
      description: desc,
      prevDescription: ''
    });
  }

  delete() {
    console.log('deleting card');
  }

  close() {
    console.log('closing card');
  }

  render(){

    let { title, description, editDescription, editTitle } = this.state;
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
                    <p className="text-btn" onClick={ () => this.save('editTitle') } >SAVE</p>
                  </div>
                  :
                  <h1 onClick={ () => this.edit('editTitle') }>{title}</h1>
                }
                <p className="text-btn">in list <a href={`#/boards/`}>{listName}</a></p>
              </div>
            </div>
            
            <div className="box">
              <DescrIcon />
              <div className="little-box">
                <div className="description">
                  <h2>Description</h2>
                  <p className="text-btn"><a onClick={ () => this.edit('editDescription') } >{ (editDescription || !description) ? '' : 'EDIT' }</a></p>
                </div>
                {
                  (editDescription || !description)
                  ?
                  <textarea onClick={ () => this.edit('editDescription') } onChange={ e => this.handleChange('description', e.target.value) } type="text" placeholder="Add a more detailed description..." value={description}/>
                  :
                  <p>{description}</p>
                }
                {
                  editDescription
                  ?
                  (
                    <div className="editing">
                      <button className="save-btn btn" onClick={ () => this.save('editDescription') }>Save Changes</button>
                      <div className="exit" onClick={ () => this.cancelEdit() }>
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
            <div onClick={ () => this.close() }  className="exit">
              <div className="one long line"></div>
              <div className="two long line"></div>
            </div>
            <button onClick={ () => this.delete() } className="btn">Delete Card</button>
          </div>

        </div>
      </div>
    );
  }
}