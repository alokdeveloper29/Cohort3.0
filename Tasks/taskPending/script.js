let addTransactionBtn = document.querySelector(".add-transaction-Btn");
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".ri-close-line");
let form = document.querySelector("#form");
let submitBtn = document.querySelector(".submitBtn");
let transactions = document.querySelector(".transactions");
let transactionHeading = document.querySelector(".transactionHeading");
let currentBalance = document.querySelector(".currentBalance");
let totalIncome = document.querySelector(".totalIncome");
let totalExpense = document.querySelector(".totalExpense");
let totalTransaction = document.querySelector(".totalTransaction");
let ctx = document.querySelector("#cashFlowChart");
let resetAll = document.querySelector(".ri-delete-bin-2-fill");

addTransactionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "none";
});

let registerUser = JSON.parse(localStorage.getItem("registerUser")) || [];
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let user = {
    type: form[0].value,
    description: form[1].value,
    amount: form[2].value,
    date: form[3].value,
    category: form[4].value,
  };

  let isAlreadyExit = registerUser.find((item) => {
    return (
      item.type == user.type &&
      item.description == user.description &&
      item.amount == user.amount &&
      item.date == user.date &&
      item.category == user.category
    );
  });
  if (isAlreadyExit) {
    transactionUI();
    modal.style.display = "none";
    form.reset();
    alert("user already exit");
    return;
  }

  if (edit !== null) {
    registerUser[edit] = user;
  } else {
    registerUser.push(user);
  }

  saveToLocalStorage();
  transactionUI();
  modal.style.display = "none";
  form.reset();
  calculatUI();
});

let transactionUI = () => {
  transactions.innerHTML = "";

  registerUser.forEach((elem, idx) => {
    transactions.innerHTML += `<div class="transactions-box">
                    <p>${elem.date}</p>
                    <p>${elem.description}</p>
                    <p>${elem.category}</p>
                    <p>${elem.amount}</p>
                    <div class="edit-delete">
                        <i onclick="editUI(${idx})" class="ri-pencil-fill"></i>
                        <i onclick="deleteUI(${idx})" class="ri-delete-bin-2-fill"></i>
                    </div>
                </div>`;
  });
};

let edit = null;
let editUI = (idx) => {
  edit = idx;
  modal.style.display = "flex";

  form[0].value = registerUser[idx].type;
  form[1].value = registerUser[idx].description;
  form[2].value = registerUser[idx].amount;
  form[3].value = registerUser[idx].date;
  form[4].value = registerUser[idx].category;

  transactionHeading.innerHTML = "Edit Transaction";
};

let deleteUI = (idx) => {
  registerUser.splice(idx, 1);
  saveToLocalStorage();
  transactionUI();
  calculatUI();
};

let calculatUI = () => {
  let transaction = 0;
  let balance = 0;
  let income = 0;
  let expense = 0;

  registerUser.forEach((item) => {
    if (item.type === "Income") {
      income += Number(item.amount);
      balance += Number(item.amount);
      transaction++;
    }

    if (item.type === "Expense") {
      expense += Number(item.amount);
      balance -= Number(item.amount);
      transaction++;
    }
  });

  currentBalance.innerHTML = balance;
  totalIncome.innerHTML = income;
  totalExpense.innerHTML = expense;
  totalTransaction.innerHTML = transaction;

  myChart.data.datasets[0].data = [income];
  myChart.data.datasets[1].data = [expense];
  myChart.update();
};

let myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Income vs Expenses"],
    datasets: [
      {
        label: "Income",
        data: [0],
        backgroundColor: "green",
      },
      {
        label: "Expenses",
        data: [0],
        backgroundColor: "red",
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  },
});

resetAll.addEventListener("click", (e) => {
  e.preventDefault();
  alert("reset all data");
  registerUser.length = 0;

  saveToLocalStorage();

  transactionUI();
  calculatUI();
});

let saveToLocalStorage = () => {
  localStorage.setItem("registerUser", JSON.stringify(registerUser));
};

transactionUI();
calculatUI();