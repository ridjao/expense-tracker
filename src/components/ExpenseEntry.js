import React from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { addExpense, addType, addItem } from "../actions";
import { dateToLocalISOString } from "./Utils"

import { v4 as uuidv4 } from 'uuid';

const mapStateToProps = state => {
    console.log("Entry types:", state.types);
    console.log("Entry items:", state.items);
    return {
        types: state.types,
        items: state.items
    };
};

function mapDispatchToProps(dispatch) {
    console.log("ExpenseEntry mapDispatchToProps");
    return {
        addExpense: expense => dispatch(addExpense(expense)),
        addType: type => dispatch(addType(type)),
        addItem: item => dispatch(addItem(item))
    };
}
  
class ConnectedExpenseEntry extends React.Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            type: "",
            amount: "",
            date: dateToLocalISOString(new Date()).substr(0,10),
            item: "",
            qty: 1
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.id = uuidv4();
        this.typeInput = React.createRef();
        this.typeItem = React.createRef();
        this.addButton = React.createRef();
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }  

    handleKeyPress(event) {
        if (event.key === "Enter") {
            this.addButton.current.click();
        }
    }

    handleAdd(event) {
        event.preventDefault();
        console.log("Add expense", this.id, this.state.type, this.state.amount, this.state.date, this.state.item, this.state.qty);
        this.props.addExpense({
            id: this.id,
            type: this.state.type,
            amount: this.state.amount,
            date: this.state.date,
            item: this.state.item,
            qty: this.state.qty 
        });
        this.id = uuidv4()

        const typeIdx = this.props.types.findIndex(type => type === this.state.type);
        if (typeIdx === -1) {
            this.props.addType(this.state.type)
        }
        
        const itemIdx = this.props.items.findIndex(item => item === this.state.item);
        if (itemIdx === -1) {
            this.props.addItem(this.state.item)
        }

        this.setState({ 
            id: this.id,
            amount: "",
            item: "",
            qty: 1
        });

        this.typeInput.current.focus();
    }

    render() {
        return (
            <div>
                <label htmlFor="id">--{this.id}--</label>
                <br/>
                <label htmlFor="type">Type</label>
                <input ref={this.typeInput} id="type" type="text" value={this.state.type} list="types" onChange={this.handleChange} tabIndex="1" autoFocus placeholder="Enter type..." />
                <datalist id="types">
                {
                    this.props.types.map(type => <option key={type} value={type} />)
                }
                </datalist>
                <br/>
                <label htmlFor="amount">Amount</label>
                <input id="amount" type="number" value={this.state.amount} onChange={this.handleChange} tabIndex="2" onKeyPress={this.handleKeyPress} placeholder="Enter amount..." />
                <br/>
                <label htmlFor="date">Date</label>
                <input id="date" type="date" value={this.state.date} onChange={this.handleChange} tabIndex="-1" placeholder="Enter date..." />
                <br/>
                <label htmlFor="item">Item</label>
                <input ref={this.typeItem} id="item" type="text" value={this.state.item} list="items" onChange={this.handleChange} tabIndex="3" onKeyPress={this.handleKeyPress} placeholder="Enter item..." />
                <datalist id="items">
                {
                    this.props.items.map(item => <option key={item} value={item} />)
                }
                </datalist>
                <br/>
                <label htmlFor="qty">Qty</label>
                <input id="qty" type="number" value={this.state.qty} onChange={this.handleChange} tabIndex="4" onKeyPress={this.handleKeyPress} placeholder="Enter quantity..." />
                <br/>
                <button ref={this.addButton} onClick={this.handleAdd} tabIndex="5" disabled = {this.state.type === "" || this.state.amount === ""} >Add</button>
            </div>
        );
    }
}

ConnectedExpenseEntry.propTypes = {
    id: PropTypes.number,
    type: PropTypes.string,
    amount: PropTypes.number,
    date: PropTypes.string,
    qty: PropTypes.number
};

const ExpenseEntry = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedExpenseEntry);

export default ExpenseEntry;
