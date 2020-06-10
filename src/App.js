import React from 'react';
import './App.css';
import Items from './components/Items'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            currentItem:{
                value: '',
                key : ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleChange(event){
        this.setState({currentItem: {value: event.target.value, key: Date.now()}});
    }

    handleSubmit(event){
        event.preventDefault();
        const newItem = this.state.currentItem;
        if(newItem.value !== ""){
            const newItems = [...this.state.items, newItem];
            this.setState({items: newItems, currentItem: {value: '', key: ''}});
        }
    }

    handleDelete(key){
        const newItems = this.state.items.filter(item => item.key !== key);
        this.setState({items: newItems});
    }

    handleUpdate(newText, key){
        const newItems = this.state.items;
        newItems.map(item =>{
            if(item.key === key){
                item.value = newText;
            }
        })

        this.setState({items: newItems});
    }

    render(){
        return (
            <div className = "App">
                <header>
                    <form onSubmit = {this.handleSubmit} id = "to-do-form">
                        <input type = "text" value = {this.state.currentItem.value} onChange = {this.handleChange} placeholder = "Enter Text"/>
                        <button type = "submit">Add</button>
                    </form>
                </header>
                <Items items = {this.state.items} deleteItem = {this.handleDelete} updateItem = {this.handleUpdate} ></Items>
            </div>
        );
    }
}
export default App;
