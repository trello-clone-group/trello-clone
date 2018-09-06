import React,  { Component } from 'react';
import Axios from 'axios';
import Card from '../Card/Card';
import './List.css';
import { connect } from 'react-redux';
import { changeDisplayModal, changeModalData, updateLists, updateCards } from '../../ducks/reducer';
import { CancelIcon, SettingsIcon } from '../Icons/Icons';

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
        }
    }

    componentDidMount(){
        let { listId, lists } = this.props;
        let data = lists.find(list => list.list_id === listId);
        this.setState({ listData: data });
    }

    addCard(){
        this.props.changeDisplayModal(true);
        let data = {
            list_id: this.props.listId,
            title: '',
            description: '',
            list_title: this.state.listData.list_title
        }
        this.props.changeModalData( data );
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
        let { cardsData } = this.props;
        let { listData, editingListTitle, displayDelete } = this.state;
        let { list_name } = listData;

        let cardComponents = cardsData
            .filter(card => card.list_id === listData.list_id)
            .map((card, i) => <Card key={i} cardId={card.card_id}/>);
        
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
                { cardComponents }
                <div onClick={() => this.addCard()} className = 'cardBody addCard'>
                    + Add Another Card
                </div>
                </div>
    
             
        )
    }
}

function mapStateToProps(state){
    let { displayModal, cardsData, lists } = state;
    return {
        displayModal,
        cardsData,
        lists
    }
}

export default connect(mapStateToProps, { changeDisplayModal, changeModalData, updateCards, updateLists })(List);