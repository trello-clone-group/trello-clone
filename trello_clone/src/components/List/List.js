import React,  { Component } from 'react';
import Axios from 'axios';
import Card from '../Card/Card';
import './List.css';
import { connect } from 'react-redux';
import { changeDisplayModal, changeModalData } from '../../ducks/reducer';
import { CancelIcon, SettingsIcon } from '../Icons/Icons';
//import { Link } from 'react-router-dom';

class List extends Component {
    constructor(props){
        super(props);

        this.state = {
            listData: {
                list_id: null,
                list_name: '',
                board_id: null
            },
            displayDelete: false,
            editingListTitle: false,
            previousListTitle: '',
            cardsData: []
        }
    }

    addCard(){
        this.props.changeDisplayModal(true);
        this.props.changeModalData(Object.assign({}, {list_id: this.state.listData.list_id}));
    }

    componentDidMount(){
        let { listId } = this.props;

        Axios.get('/api/lists')
            .then(response => {
                let list = response.data.filter(item => item.list_id === parseInt(listId) );
                this.setState({ listData: list[0] });
            })
        this.getCardData();
    }

    getCardData(){
        let { listId } = this.props;
        Axios.get(`api/cards/${listId}`)
            .then( response => {
                this.setState({ cardsData: response.data });
            })
            .catch( err => console.log(err.message));
    }

    editName(){
        this.setState({
            previousListTitle: this.state.listData.list_name,
            editingListTitle: true
        });
    }

    saveListTitle(){
        let { list_id, list_name } = this.state.listData;
        Axios.put(`/api/lists/${list_id}`, { list_name })
            .then(response => console.log(response.data))
            .catch(err => console.log(err.message));
        this.setState({
            editingListTitle: false,
            previousListTitle: ''
        })
    }

    cancelEdit(){
        let newData = this.state.listData;
        newData.list_name = this.state.previousListTitle;
        this.setState({
            editingListTitle: false,
            listData: newData,
            previousListTitle: ''
        });
    }

    handleChange(value){
        console.log(value);
        let newData = { ...this.state.listData };
        newData.list_name = value;
        this.setState({ listData: newData });
    }

    deleteList(){
        let { list_id } = this.state.listData;
        Axios.delete(`/api/lists/${list_id}`)
            .then(response => {
                this.setState({ displayDelete: false });
            })
            .catch(err => console.log(err.message));
    }

    render(){
        let { listData, cardsData, editingListTitle, displayDelete } = this.state;
        let { list_name } = listData;

        let cards = cardsData.map((card, i) => <Card key={i} cardId={card.card_id}/>);
        
        return(
           
              <div className = 'listBody'>
                {
                    (!editingListTitle)
                    ?
                    <div className="list-header">
                        <h3 onClick={() => this.editName()} className="listTitle">{list_name}</h3>
                        {
                            (!displayDelete)
                            ?
                            <div onClick={() => this.setState({displayDelete: true})}><SettingsIcon/></div>
                            :
                            <div className="edit-list-name">
                                <button onClick={() => this.deleteList()} >Delete</button>
                                <div onClick={() => this.setState({ displayDelete:false })} ><CancelIcon/></div>
                            </div>
                        }
                    </div>
                    :
                    <div className="edit-list-name">
                        <input type="text" value={list_name} onChange={e => this.handleChange(e.target.value)}/>
                        <button onClick={() => this.saveListTitle()}>Save</button>
                        <div onClick={() => this.cancelEdit()}>
                            <CancelIcon />
                        </div>
                    </div>

                }
                { cards }
                <div onClick={() => this.addCard()} className = 'cardBody addCard'>
                    + Add Another Card
                </div>
                </div>
    
             
        )
    }
}

function mapStateToProps(state){
    let { displayModal } = state;
    return {
        displayModal
    }
}

export default connect(mapStateToProps, { changeDisplayModal, changeModalData })(List);