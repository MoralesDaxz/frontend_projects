//Variables y selectores
const listExpense = document.querySelector("#expense ul");
const inputBudget = document.getElementById("budgetInput");
const budgetForm = document.getElementById("budgetForm");
const spanAmount = document.getElementById("amount");
const spanTotal = document.getElementById("total");
const spanRemaining = document.getElementById("reamining");
const formExpense = document.getElementById("addExpenseForm");
let budget;
//Eventos
budgetForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita recargar la página
  loadBudget();
});

formExpense.addEventListener("submit", (event) => {
  event.preventDefault();
  addExpense();
});
//Clases
class Budget {
  constructor(budgetProp) {
    this.amount = Number(budgetProp);
    this.subAmount = Number(budgetProp);
    this.expense = [];
  }
 
  calculateSubAmount() {
    const expensed = this.expense.reduce(
      (total, curr) => total + curr.qtyExpense,
      0
    );
    this.subAmount = Number(this.amount - expensed);
  }
  insertBudget() {
    document.getElementById("total").innerText = this.amount;
    document.getElementById("remaining").innerText = this.subAmount;
  }
  calculateExpense(propExpense) {
    this.expense = [...this.expense, propExpense];
    this.calculateSubAmount();
    this.insertBudget();
    console.log(this.expense);
    
  }
}

class UserInterface {
  constructor(uiProp) {}
  insertAlert(message, type, id) {
    const background = type === "error" ? "bg-red-500" : "bg-green-400";
    const alertBox = document.createElement("p");
    alertBox.innerHTML = `<p id=${id} class='text-center ${background}'>${message}</p>`;
    budgetForm.appendChild(alertBox);
  }
  rmvElement(id) {
    setTimeout(() => {
      document.getElementById(id).remove();
    }, 2000);
  }
}
//Instancias
const ui = new UserInterface();
budget = new Budget();
//Funciones
function addExpense() {
  const nameExp = document.getElementById("nameExpense").value;
  const qtyExpense = Number(document.getElementById("quantityExpense").value);
  const expense = { nameExp, qtyExpense, id: Date.now() };
  budget.calculateExpense(expense);
}
//Carga de presupuesto
const loadBudget = () => {
  const valor = parseFloat(inputBudget.value);
  if (!isNaN(valor) && valor > 0) {
    budget = new Budget(valor);
    inputBudget.disabled = true;
    spanAmount.innerText = valor.toLocaleString();
    budget.insertBudget();
  } else {
    ui.insertAlert("Ingrese un número válido.", "error", "errorEntry");
    ui.rmvElement("errorEntry");
  }
};
const isDisabledBudgetButton = () => {
  inputBudget.disabled = false;
  inputBudget.value = "";
  return;
};

//agregar gastos
