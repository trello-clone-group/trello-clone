import React, { Component } from 'react';
import './Modal.css';
import { TitleIcon, DescrIcon } from '../Icons/Icons';
import { connect } from 'react-redux';
import { changeDisplayModal } from '../../ducks/reducer';

const dummyProps = {
  listName: 'Planning / PreCoding MVP',

};

class Modal extends Component {
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
    this.props.changeDisplayModal(false);
  }

  render(){

    let { title, description, editDescription, editTitle } = this.state;
    let { listName } = dummyProps;

    let { displayModal } = this.props;
    
    return (
      (!displayModal)
      ?
      <button onClick={ () => this.props.changeDisplayModal(true)}>Click to display Modal</button>
      :
      <div className="modal__modal-screen" >
        <div className="modal__modal">

          <div className="modal__left">
            <div className="modal__box">
              <TitleIcon />
              <div className="modal__little-box">
                {
                  editTitle
                  ?
                  <div className="modal__title-input">
                    <input type="text" value={title} onChange={ e => this.handleChange('title', e.target.value) }/>
                    <p className="modal__text-btn" onClick={ () => this.save('editTitle') } >SAVE</p>
                  </div>
                  :
                  <h1 onClick={ () => this.edit('editTitle') }>{title}</h1>
                }
                <p className="modal__text-btn">in list <a href={`#/boards/`}>{listName}</a></p>
              </div>
            </div>
            
            <div className="modal__box">
              <DescrIcon />
              <div className="modal__little-box">
                <div className="modal__description">
                  <h2>Description</h2>
                  <p className="modal__text-btn"><a onClick={ () => this.edit('editDescription') } >{ (editDescription || !description) ? '' : 'EDIT' }</a></p>
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
                    <div className="modal__editing">
                      <button className="modal__save-btn modal__btn" onClick={ () => this.save('editDescription') }>Save Changes</button>
                      <div className="modal__exit" onClick={ () => this.cancelEdit() }>
                        <div className="modal__one modal__short modal__line"></div>
                        <div className="modal__two modal__short modal__line"></div>
                      </div>
                    </div>
                  )
                  :
                  <p></p>
                }
              </div>
            </div>
          </div>

          <div className="modal__right">
            <div onClick={ () => this.close() }  className="modal__exit">
              <div className="modal__one modal__long modal__line"></div>
              <div className="modal__two modal__long modal__line"></div>
            </div>
            <button onClick={ () => this.delete() } className="modal__btn">Delete Card</button>
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  let { displayModal } = state;
  return {
    displayModal
  }
}

export default connect(mapStateToProps, { changeDisplayModal })(Modal);