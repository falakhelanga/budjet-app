class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  // SUBMIT BUDGET METHOD
  submitBudjetForm() {
    const value = this.budgetInput.value;

    if (value === "" || value < 0) {
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerHTML = ` <p> value cannot be empty or negative </p> `;
      setTimeout(() => {
        this.budgetFeedback.classList.remove("showItem");
      }, 4000);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = null;
      this.showBalance();
    }
  }

  // EXPENSES METHOD
  expenceSubmitForm() {
    const expensesValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;

    if (amountValue === "" || amountValue < 0 || expensesValue === "") {
      this.expenseFeedback.classList.add("showItem");
      this.expenseFeedback.innerHTML = ` <p> value cannot be empty or negative </p> `;
      setTimeout(() => {
        this.expenseFeedback.classList.remove("showItem");
      }, 4000);
    } else {
      let amount = parseInt(amountValue);
      this.expenseInput.value = "";
      this.amountInput.value = "";

      let expense = {
        id: this.itemID,
        title: expensesValue,
        amount: amount
      };
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);

      // SHOW BALANCE
      this.showBalance();
    }
  }

  // ADD EXPENSE

  addExpense(expense) {
    const div = document.createElement("div");
    div.classList.add("expense");
    div.innerHTML = `<div class="expense">
        <div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>

       </div>`;
    this.expenseList.appendChild(div);
  }

  // TOTAL EXPENSE

  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce((acc, curr) => {
        acc += curr.amount;

        return acc;
      }, 0);
    }
    this.expenseAmount.textContent = total;
    return total;
  }

  // SHOW BALANCE METHOD
  showBalance() {
    const expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = total;
    if (total < 0) {
      this.balance.classList.remove("showGreen", "showBlack");
      this.balance.classList.add("showRed");
    }
    if (total > 0) {
      this.balance.classList.remove("showRed", "showBlack");
      this.balance.classList.add("showGreen");
    }
    if (total === 0) {
      this.balance.classList.remove("showGreen", "showRed");
      this.balance.classList.add("showBlack");
    }
  }

  editExpense() {}

  deleteExpense() {}
}

function eventListners() {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");

  //new instance of  ui class
  const ui = new UI();

  // budjet form submit
  budgetForm.addEventListener("submit", function(event) {
    event.preventDefault();
    ui.submitBudjetForm();
  });

  // expense form submit
  expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();
    ui.expenceSubmitForm();
  });

  // expense click
  expenseList.addEventListener("click", function(event) {
    if (event.target.parentElement.classList.contains("edit-icon")) {
      ui.editExpense();
    } else if (event.target.parentElement.classList.contains("delete-icon")) {
      ui.deleteExpense();
    }
  });
}
window.addEventListener("load", function() {
  eventListners();
});
