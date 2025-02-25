//Variables y selectores
const listExpense = document.querySelector("#expense ul");
const inputBudget = document.getElementById("budgetInput");
const formExpense = document.getElementById("budgetForm");

const budgetValue = [];

//Eventos
formExpense.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita recargar la página
  loadBudget();
});
//Clases
class Budget {
  constructor(budgetProp) {
    this.budget = budgetProp;
    this.sub = budgetProp;
    this.expense = [];
  }
}

class UserInterface {}

//Funciones
//Carga de presupuesto
const loadBudget = () => {
  const valor = parseFloat(inputBudget.value);
  if (!isNaN(valor) && valor > 0) {
    budgetValue[0] = valor;
    inputBudget.disabled = true;
    console.log(budgetValue);
  } else {
    alert("Ingrese un número válido.");
  }
};
const isDisabledBudgetButton = () => {
  inputBudget.disabled = false;
  inputBudget.value = "";
  return;
};
