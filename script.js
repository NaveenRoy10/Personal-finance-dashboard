let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateDashboard() {
    let income = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    let expense = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
    let balance = income - expense;
    
    document.getElementById("totalIncome").innerText = income;
    document.getElementById("totalExpense").innerText = expense;
    document.getElementById("balance").innerText = balance;
    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderTransactions();
}

function addTransaction() {
    let description = document.getElementById("description").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let type = document.getElementById("type").value;
    
    if (!description || isNaN(amount)) return alert("Enter valid details.");
    transactions.push({ description, amount, type });
    updateDashboard();
}

function renderTransactions() {
    let transactionList = document.getElementById("transactionList");
    transactionList.innerHTML = "";
    transactions.forEach((t, index) => {
        let li = document.createElement("li");
        li.className = t.type;
        li.innerHTML = `${t.description} <span>${t.type === "income" ? "+" : "-"}$${t.amount}</span>`;
        transactionList.appendChild(li);
    });
}

function clearTransactions() {
    transactions = [];
    localStorage.removeItem("transactions");
    updateDashboard();
}

updateDashboard();
