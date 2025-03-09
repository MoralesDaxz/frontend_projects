//Variables y selectores
const listExpense = document.querySelector("#expenseList");
const inputBudget = document.getElementById("budgetInput");
const budgetForm = document.getElementById("budgetForm");
const spanAmount = document.getElementById("amount");
const boxFormExpense = document.getElementById("boxAddExpense");
const formExpense = document.getElementById("addExpenseForm");
const spanTotal = document.getElementById("total");
const spanRemaining = document.getElementById("remaining");
const boxListExpense = document.getElementById("boxListExpense");
const saveBtn = document.getElementById("saveBtn");
const restartBtn = document.getElementById("restartBtn");
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

    return (this.subAmount = Number(this.amount - expensed));
  }

  calculateExpense(propExpense) {
    const limitAmount = this.subAmount - propExpense.qtyExpense;
    if (limitAmount < 0) {
      ui.insertAlert("Fondos insuficientes", "error", "not_credit");
      ui.rmvElement("not_credit");
      
      return;
    }
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
    document.querySelector("#boxAddExpense").appendChild(alertBox);
  }
  createListExpense(arrExpense) {
    listExpense.innerHTML = "";

    // Crear la tabla y sus elementos
    const table = document.createElement("table");
    table.classList.add("expenseTable");

    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Acciones</th>
        </tr>
    `;

    const tbody = document.createElement("tbody");

    arrExpense.forEach((element, index) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.innerText = element.nameExpense;

      const qtyCell = document.createElement("td");
      qtyCell.innerText = element.qtyExpense.toString();

      const actionCell = document.createElement("td");
      const deleteBtn = document.createElement("button");

      deleteBtn.classList.add("btnDltExpense");
      deleteBtn.innerText = "X";
      deleteBtn.id = element.id;

      deleteBtn.addEventListener("click", (event) => {
        budget.deleteItemExpense(event.target.id);
      });

      actionCell.appendChild(deleteBtn);

      row.appendChild(nameCell);
      row.appendChild(qtyCell);
      row.appendChild(actionCell);
      index % 2 == 0 ? row.classList.add("bg-gray-500") : "";
      tbody.appendChild(row);
    });

    // Añadir encabezado y cuerpo a la tabla
    table.appendChild(thead);
    table.appendChild(tbody);

    // Agregar la tabla al contenedor principal
    listExpense.appendChild(table);
  }
  budgetAndRest(amount, subAmount) {
    spanTotal.innerText = `${amount.toLocaleString()} €`;
    spanRemaining.innerText = `${subAmount.toLocaleString()} €`;
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
  const qtyExpense = parseFloat(
    document.getElementById("quantityExpense").value
  );

  const expense = {
    nameExpense,
    qtyExpense,
    id: crypto.randomUUID(),
  };

  if (nameExpense === "") {
    ui.insertAlert("Indique concepto", "error", "errorConcept");
    ui.rmvElement("errorConcept");
  } else if (isNaN(qtyExpense) || qtyExpense <= 0) {
    ui.insertAlert("Monto invalido", "error", "errorAmount");
    ui.rmvElement("errorAmount");
    return;
  } else {
    budget.calculateExpense(expense);
    boxListExpense.classList.remove("hidden");
    boxListExpense.classList.add("containerTable");
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
    saveBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
    spanAmount.innerText = `${valor.toLocaleString()} €`;
    ui.budgetAndRest(valor, valor);
    boxFormExpense.classList.remove("hidden");
    budgetForm.classList.add("hidden")
   
    
  } else {
    ui.insertAlert("Ingrese un número válido.", "error", "errorEntry");
    ui.rmvElement("errorEntry");
    return;
  }
};

const resetPage = () => {
  window.location.reload();
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
