export function addExpense(payload) {
    console.log("Add expense", payload);
    return { type: "ADD_EXPENSE", payload }
};

export function removeExpense(payload) {
    console.log("Remove expense", payload);
    return { type: "REMOVE_EXPENSE", payload }
};

export function clearExpenses(payload) {
    console.log("Clear expenses", payload);
    return { type: "CLEAR_EXPENSES", payload }
};

export function addType(payload) {
    console.log("Add type", payload);
    return { type: "ADD_TYPE", payload }
};

export function removeType(payload) {
    console.log("Remove type", payload);
    return { type: "REMOVE_TYPE", payload }
};

export function addItem(payload) {
    console.log("Add item", payload);
    return { type: "ADD_ITEM", payload }
};

export function reloadLogs(payload) {
    console.log("Reload expense logs");
    return { type: "RELOAD_LOGS", payload}
}

export function loadTypes(payload) {
    console.log("Load types", payload);
    return { type: "LOAD_TYPES", payload}
}

export function loadItems(payload) {
    console.log("Load items", payload);
    return { type: "LOAD_ITEMS", payload}
}
