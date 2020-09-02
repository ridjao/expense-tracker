class Repository {
    putExpenses(expenses) {
        console.log("Put expenses to repository", expenses);
        expenses.map(expense => window.localStorage.setItem(expense.id, JSON.stringify(expense)));
    }

    getExpenses() {
        var expenses = [];
        for (var i = 0, len = localStorage.length; i < len; ++i) {
            expenses.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
        console.log("Got expenses from repository", expenses);
        return expenses;
    }

    clear() {
        console.log("Cleared repository");
        window.localStorage.clear();
    }
}

export default Repository;
