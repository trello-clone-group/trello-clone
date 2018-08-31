import React, { Component } from 'react';
import Axios from 'axios';
import './Modal.css';
import { TitleIcon, DescrIcon } from '../Icons/Icons';
import { connect } from 'react-redux';
import { changeDisplayModal, changeModalData } from '../../ducks/reducer';

class Modal extends Component {
  constructor(props){
    super(props);

    this.state = {
      prevDescription: '',
      editDescription: false,
      editTitle: false
    }

    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount(){
    // TODO: componentDidMount only fires once. I have to figure out how to pass the list_title down to modal

    // let { list_id } = this.props.modalData;
    // if (!list_id) {
    //   return;
    // }
    // Axios.get('/api/lists')
    //   .then(response => {
    //     console.log(response.data);
    //     let listTitle = response.data.filter(item => item.list_id ==)
    //   })
    //   .catch(err => console.log(err.message));
  }

  handleTitleChange(val) {
    let newData = Object.assign({}, this.props.modalData, { card_title: val });
    this.props.changeModalData(newData);
  }
  handleDescrChange(val){
    let newData = Object.assign({}, this.props.modalData, { description: val});
    this.props.changeModalData(newData);
  }

  edit(key) {
    let obj = {};
    obj[key] = true;
    if (key === "editDescription") {
      let desc = this.props.modalData.description;
      this.setState({
        prevDescription: desc,
        editDescription: true
      });
    } else {
      this.setState( obj );
    }
  }

  save(key){
    let { card_id, card_title, description, list_id } = this.props.modalData;
    Axios.put(`/api/card/${card_id}`, { card_title, description, list_id })
      .then( response => {
        console.log(response.data);
      } )
      .catch( err => console.log( err.message ) );

    let obj = {};
    obj[key] = false;
    this.setState( obj );
  }

  cancelEdit() {
    let desc = this.state.prevDescription;
    this.props.changeModalData( Object.assign({}, this.props.modalData, {description: desc }));
    this.setState({
      editDescription: false,
      prevDescription: ''
    });
  }

  delete() {
    let { card_id } = this.props.modalData;
    Axios.delete(`/api/card/${card_id}`)
      .then(response => console.log(response.data))
      .catch( err => console.log(err.message) );

    this.props.changeDisplayModal(false);
  }

  close() {
    this.props.changeDisplayModal(false);
  }

  render(){

    let { editDescription, editTitle } = this.state;
    let { displayModal, modalData } = this.props;
    let { card_id, card_title, description, list_id } = modalData;
    let list_title = "fun";
    
    return (
      (!displayModal)
      ?
      <p></p>
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
                    <input type="text" value={card_title} onChange={ e => this.handleTitleChange(e.target.value) }/>
                    <p className="modal__text-btn" onClick={ () => this.save('editTitle') } >SAVE</p>
                  </div>
                  :
                  <h1 onClick={ () => this.edit('editTitle') }>{card_title}</h1>
                }
                <p className="modal__text-btn">in list {list_title}</p>
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
                  <textarea onClick={ () => this.edit('editDescription') } onChange={ e => this.handleDescrChange(e.target.value) } type="text" placeholder="Add a more detailed description..." value={description}/>
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
  let { displayModal, modalData } = state;
  return {
    displayModal,
    modalData
  }
}

export default connect(mapStateToProps, { changeDisplayModal, changeModalData })(Modal);