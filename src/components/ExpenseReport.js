import React from 'react';

import { connect } from "react-redux";
import { formatNumberWithCommas, dateToLocalISOString } from "./Utils";

const mapStateToProps = state => {
    console.log("Entry types:", state.types);
    console.log("Entry items:", state.items);
    return {
        expenses: state.logs,
        types: state.types,
        items: state.items
    };
};

class ConnectedExpenseReport extends React.Component {
    constructor() {
        super();
        this.handleGenerate = this.handleGenerate.bind(this);
        this.months = [];

        let month = new Date();
        month.setDate(1);
        for (let i = 0; i < 6; i++){
            this.months.push(dateToLocalISOString(month).substring(0,7));
            month.setMonth(month.getMonth()-1);
        }
        console.log("Months:", this.months);
    }

    handleGenerate() {
        this.render();
    }

    getExpenseRows() {
        let id = 1;
        const rows = this.props.types.map(type => Object.create({
            id: id++,
            type: type,
            amounts: []
        }));

        const totals = Object.create({
            id: id++,
            type: "Total",
            amounts: []
        });

        for (const month of this.months) {
            let expenses = this.props.expenses.filter(expense => expense.date.substring(0,7) === month);
            for (const rowId in rows) {
                rows[rowId].amounts.push(expenses.reduce((subtotal, expense) => {
                    if (expense.type === rows[rowId].type)
                        return subtotal + Number(expense.amount);
                    return subtotal;
                }, 0).toFixed(2));
            }

            totals.amounts.push(expenses.reduce((subtotal, expense) => subtotal + Number(expense.amount),0).toFixed(2));
        }
        rows.push(totals);
        return rows;
    }

    getItemRows() {
        let id = 1;
        const rows = this.props.items.filter(item => item !== "").map(item => Object.create({
            id: id++,
            item: item,
            amounts: [],
            qtys: []
        }));

        const totals = Object.create({
            id: id++,
            item: "Total",
            qtys: [],
            amounts: []
        });

        for (const month of this.months) {
            let expenses = this.props.expenses.filter(expense => expense.date.substring(0,7) === month);
            for (const rowId in rows) {
                rows[rowId].qtys.push(expenses.reduce((subtotal, expense) => {
                    if (expense.item === rows[rowId].item)
                        return subtotal + Number(expense.qty);
                    return subtotal;
                }, 0));

                rows[rowId].amounts.push(expenses.reduce((subtotal, expense) => {
                    if (expense.item === rows[rowId].item)
                        return subtotal + Number(expense.amount);
                    return subtotal;
                }, 0).toFixed(2));
            }

            totals.qtys.push("N/A");
            totals.amounts.push(expenses.reduce((subtotal, expense) => subtotal + Number(expense.amount),0).toFixed(2));
        }
        rows.sort((a,b) => (b.amounts[0] - a.amounts[0]));
        rows.push(totals);
        return rows;
    }

    renderHeaders() {
        let colId = 1;
        return (
            <tr>
                <th></th>
                {this.months.map(month => (<th key={colId++}>{month}</th>))}
            </tr>
        );
    }

    renderExpenseRow(row) {
        let colId = 1;
        return (
            <tr key={row.id}>
                <td>{row.type}</td>
                {
                    row.amounts.map(amount => (<td key={colId++}>{formatNumberWithCommas(amount)}</td>))
                }
            </tr>
        );
    }

    renderItemRow(row) {
        let colId = 1;
        return (
            <tr key={row.id}>
                <td>{row.item}</td>
                {
                    //row.qtys.map(qty => (<td key={colId++}>{qty}</td>))
                    row.amounts.map(amount => (<td key={colId++}>{formatNumberWithCommas(amount)}</td>))
                }
            </tr>
        );
    }

    render() {
        return (
            <div>
                <h3>Expense Report</h3>
                <table>
                    <thead>
                        {this.renderHeaders()}
                    </thead>
                    <tbody>
                    {
                        this.getExpenseRows().map(row => this.renderExpenseRow(row))
                    }
                    </tbody>
                </table>
                <br/>
                <table>
                    <thead>
                        {this.renderHeaders()}
                    </thead>
                    <tbody>
                    {
                        this.getItemRows().map(row => this.renderItemRow(row))
                    }
                    </tbody>
                </table>
                <table>
                    <tbody><tr><td><button onClick={this.handleGenerate}>Generate</button></td></tr></tbody>
                </table>
            </div>
        );
    }
}

const ExpenseReport = connect(
    mapStateToProps
)(ConnectedExpenseReport);

export default ExpenseReport;
