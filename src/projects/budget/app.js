//Variables y selectores
const listExpense = document.querySelector("#expenseList");
const inputBudget = document.getElementById("budgetInput");
const budgetForm = document.getElementById("budgetForm");
const spanAmount = document.getElementById("amount");
const boxFormExpense = document.getElementById("boxExpense");
const formExpense = document.getElementById("addExpenseForm");
const spanTotal = document.getElementById("total");
const spanRemaining = document.getElementById("remaining");

//Clases
class Budget {
  constructor(budgetProp) {
    this.amount = Number(budgetProp);
    this.subAmount = Number(budgetProp);
    this.expense = [];
  }

  calculateSubAmount() {
    const expensed = Number(
      this.expense.reduce((total, curr) => total + curr.qtyExpense, 0)
    );

    this.subAmount = Number(this.amount - expensed);
  }

  calculateExpense(propExpense) {
    this.expense = [...this.expense, propExpense];
    this.calculateSubAmount();
    ui.budgetAndRest(this.amount, this.subAmount);
    ui.createListExpense(this.expense);
  }
  deleteItemExpense(id) {
    const deletedItem = this.expense.filter((item) => item.id !== id);
    this.expense = deletedItem;
    this.calculateSubAmount();
    ui.budgetAndRest(this.amount, this.subAmount);
    ui.createListExpense(this.expense);
  }
}

class UserInterface {
  constructor() {}
  insertAlert(message, type, id) {
    const background = type === "error" ? "bg-red-500" : "bg-green-400";
    const alertBox = document.createElement("p");
    alertBox.innerHTML = `<p id=${id} class='${background} alert'>${message}</p>`;
    document.querySelector("#boxExpense").appendChild(alertBox);
  }
  createListExpense(arrExpense) {
    listExpense.innerHTML = "";
    arrExpense.forEach((element) => {
      console.log(element);
      const containerExpense = document.createElement("div");
      containerExpense.classList.add("itemListExpense");
      const nameItem = document.createElement("p");
      nameItem.innerText = element.nameExpense;
      const qtyItem = document.createElement("p");
      qtyItem.innerText = element.qtyExpense.toString();
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Borrar";
      deleteBtn.id = element.id;
      deleteBtn.addEventListener("click", (event) => {
        budget.deleteItemExpense(event.target.id);
      });

      containerExpense.appendChild(nameItem);
      containerExpense.appendChild(qtyItem);
      containerExpense.appendChild(deleteBtn);
      listExpense.appendChild(containerExpense);
      return element;
    });
  }
  budgetAndRest(amount, subAmount) {
    spanTotal.innerText = `${amount.toString()} €`;
    spanRemaining.innerText = `${subAmount.toString()} €`;
  }
  rmvElement(id) {
    setTimeout(() => {
      document.getElementById(id).innerHTML = "";
      document.getElementById(id).remove();
    }, 2000);
  }
}

//Instancias
const ui = new UserInterface();
let budget;
budget = new Budget();

//Funciones
function addExpense() {
  const nameExpense = document.getElementById("nameExpense").value;
  const qtyExpense = Number(document.getElementById("quantityExpense").value);
  const expense = {
    nameExpense,
    qtyExpense,
    id: crypto.randomUUID(),
  };

  if (nameExpense === "") {
    ui.insertAlert("Indique concepto", "error", "errorConcept");
    ui.rmvElement("errorConcept");
    return;
  } else if (!isNaN(qtyExpense) && qtyExpense <= 0) {
    ui.insertAlert("Monto invalido", "error", "errorAmount");
    ui.rmvElement("errorAmount");
    return;
  } else {
    budget.calculateExpense(expense);
    formExpense.reset();
    return document.getElementById("nameExpense").focus();
  }
}

//Carga de presupuesto
const initBudget = () => {
  const valor = parseFloat(inputBudget.value);
  if (!isNaN(valor) && valor > 0) {
    budget = new Budget(valor);
    inputBudget.disabled = true;
    spanAmount.innerText = `${valor.toLocaleString()} €`;
    ui.budgetAndRest(valor, valor);
    boxFormExpense.classList.remove("hidden");
    boxFormExpense.classList.add("flex flex-col gap-4 ");
  } else {
    ui.insertAlert("Ingrese un número válido.", "error", "errorEntry");
    ui.rmvElement("errorEntry");
  }
};
//Deshabilitar input de presupuesto
const isDisabledBudgetButton = () => {
  inputBudget.disabled = false;
  inputBudget.value = "";
  return;
};


//Eventos
budgetForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita recargar la página
  initBudget();
});

formExpense.addEventListener("submit", (event) => {
  event.preventDefault();
  addExpense();
});
