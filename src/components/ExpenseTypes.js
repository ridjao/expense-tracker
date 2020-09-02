import React from 'react';

import { connect } from "react-redux";
import { removeType } from "../actions";

const mapStateToProps = state => {
    console.log("Types:", state.types);
    return { types: state.types };
};

function mapDispatchToProps(dispatch) {
    console.log("ExpenseType mapDispatchToProps");
    return {
        removeType: id => dispatch(removeType(id))
    };
}

class ConnectedExpenseTypes extends React.Component {
    constructor() {
        super();
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove(event) {
        event.preventDefault();
        this.props.removeType(event.target.id);
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr><th>Types</th></tr>
                    </thead>
                    <tbody>
                    {
                        this.props.types.map(type =>
                            (
                                <tr key={type}>
                                    <td>{type}</td>
                                    <td><button id={type} onClick={this.handleRemove} tabIndex="-1">Remove</button></td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

const ExpenseTypes = connect(mapStateToProps, mapDispatchToProps)(ConnectedExpenseTypes);

export default ExpenseTypes;