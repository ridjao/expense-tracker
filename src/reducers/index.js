const initialState = {
    expenses: [],
    types: [],
    items: [],
    logs: []
};

function rootReducer(state = initialState, action) {
    if (action.type === "ADD_EXPENSE") {
        console.log("Reducer->Add expense", action.payload);
        return Object.assign({}, state, {
            expenses: state.expenses.concat(action.payload)
        });
    }

    if (action.type === "REMOVE_EXPENSE") {
        const id = state.expenses.findIndex(e => e.id === action.payload);
        var newExpenses = [...state.expenses];
        if (id >= 0)
            newExpenses.splice(id, 1);
        console.log("Reducer->Remove expense", action.payload, id);
        return Object.assign({}, state, {
            expenses: newExpenses
        });
    }

    if (action.type === "CLEAR_EXPENSES") {
        return Object.assign({}, state, {
            expenses: []
        });
    }

    if (action.type === "ADD_TYPE") {
        console.log("Reducer->Add type", action.payload);
        return Object.assign({}, state, {
            types: state.types.concat(action.payload)
        });
    }

    if (action.type === "REMOVE_TYPE") {
        const id = state.types.findIndex(type => type === action.payload);
        var newTypes = [...state.types];
        if (id >= 0)
            newTypes.splice(id, 1);
        console.log("Reducer->Remove type", action.payload, id);
        return Object.assign({}, state, {
            types: newTypes
        });
    }

    if (action.type === "ADD_ITEM") {
        console.log("Reducer->Add item", action.payload);
        return Object.assign({}, state, {
            items: state.items.concat(action.payload)
        });
    }

    if (action.type === "RELOAD_LOGS") {
        console.log("Reducer->Reload logs", action.payload);
        return Object.assign({}, state, {
            logs: action.payload
        });
    }

    if (action.type === "LOAD_TYPES") {
        console.log("Reducer->Load types", action.payload);
        return Object.assign({}, state, {
            types: action.payload
        });
    }

    if (action.type === "LOAD_ITEMS") {
        console.log("Reducer->Load items", action.payload);
        return Object.assign({}, state, {
            items: action.payload
        });
    }

    return state;
};

export default rootReducer;