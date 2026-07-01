// ── LEFT SECTION ──
let addTransactionBtn = document.querySelector(".add-transaction-Btn");
let settingsPage = document.querySelector(".settings-page");
let settingBtn = document.querySelector("#settingsBtn");
let dashboardBtn = document.querySelector("#dashboardBtn");

// ── RIGHT SECTION ──
let currentBalance = document.querySelector(".currentBalance");
let totalIncome = document.querySelector(".totalIncome");
let totalExpense = document.querySelector(".totalExpense");
let totalTransaction = document.querySelector(".totalTransaction");
let ctx = document.querySelector("#cashFlowChart");
let resetAll = document.querySelector("#resetAllBtn");
let searchInput = document.querySelector(".searchInput");
let filterSelect = document.querySelector(".filter-select");
let center = document.querySelector(".center");
let username = document.querySelector("#username");
let saveBtn = document.querySelector(".saveBtn");

// -- FORM SECTION --
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".ri-close-line");
let form = document.querySelector("#form");
let submitBtn = document.querySelector(".submitBtn");
let transactions = document.querySelector(".transactions");
let transactionHeading = document.querySelector(".transactionHeading");

// -- REGISTER OR LOGIN OR LOGOUT --
let registerBox = document.querySelector(".register-box");
let loginBox = document.querySelector(".login-box");
let mainPage = document.querySelector("main");
let registerBtn = document.querySelector("#registerBtn");
let loginBtn = document.querySelector("#loginBtn");
let showRegister = document.querySelector(".showRegister");
let showLogin = document.querySelector(".showLogin");
let logoutBtn = document.querySelector("#logout");

let currentUser = JSON.parse(localStorage.getItem("users"));
if (currentUser) {
  mainPage.style.display = "flex";
  loginBox.style.display = "none";
  registerBox.style.display = "none";

  username.textContent = currentUser[0].username;
} else {
  mainPage.style.display = "none";
  loginBox.style.display = "none";
  registerBox.style.display = "flex";
}

// ── REGISTER BUTTON CLICK ──
registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let username = document.querySelector("#regUsername").value.trim();
  let password = document.querySelector("#regPassword").value.trim();

  if (username === "" || password === "") {
    alert("Please fill all fields!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let userExist = users.find((u) => u.username === username);

  if (userExist) {
    alert("Username already exists!");
    return;
  }

  users.push({ username: username, password: password, currencySymbol: "₹" });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered successfully! Please login.");

  registerBox.style.display = "none";
  loginBox.style.display = "flex";
});

// ── LOGIN BUTTON CLICK ──
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let username = document.querySelector("#loginUsername").value.trim();
  let password = document.querySelector("#loginPassword").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let foundUser = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (foundUser) {
    loginBox.style.display = "none";
    registerBox.style.display = "none";
    mainPage.style.display = "flex";
  } else {
    alert("Wrong username or password!");
  }
});

// ── LOGOUT BUTTON CLICK ──
logoutBtn.addEventListener("click", () => {
  let sure = confirm("Are you sure you want to logout?");
  if (sure === false) {
    return;
  }

  localStorage.removeItem("users");

  mainPage.style.display = "none";
  registerBox.style.display = "flex";
  loginBox.style.display = "none";
});

showRegister.addEventListener("click", () => {
  loginBox.style.display = "none";
  registerBox.style.display = "flex";
});

showLogin.addEventListener("click", () => {
  registerBox.style.display = "none";
  loginBox.style.display = "flex";
});

addTransactionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "none";
});

//---FORM SUBMIT---
let allTransaction = JSON.parse(localStorage.getItem("allTransaction")) || [];
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let transaction = {
    type: form[0].value,
    description: form[1].value,
    amount: form[2].value,
    date: form[3].value,
    category: form[4].value,
  };

  if (
    transaction.description === "" ||
    transaction.amount === "" ||
    transaction.date === ""
  ) {
    alert("Please fill all fields!");
    return;
  }

  if (edit !== null) {
    allTransaction[edit] = transaction;
    edit = null;
  } else {
    allTransaction.push(transaction);
  }

  localStorage.setItem("allTransaction", JSON.stringify(allTransaction));

  transactionUI();
  calculatUI();

  modal.style.display = "none";
  form.reset();
});

let transactionUI = () => {
  transactions.innerHTML = "";

  allTransaction.forEach((elem, idx) => {
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

  form[0].value = allTransaction[idx].type;
  form[1].value = allTransaction[idx].description;
  form[2].value = allTransaction[idx].amount;
  form[3].value = allTransaction[idx].date;
  form[4].value = allTransaction[idx].category;

  transactionHeading.innerHTML = "Edit Transaction";
};

let deleteUI = (idx) => {
  allTransaction.splice(idx, 1);
  localStorage.setItem("allTransaction", JSON.stringify(allTransaction));
  transactionUI();
  calculatUI();
};

let calculatUI = () => {
  let transaction = 0;
  let balance = 0;
  let income = 0;
  let expense = 0;

  allTransaction.forEach((item) => {
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

  let sure = confirm("Are you sure you want to reset all data?");
  if (sure === false) {
    return;
  }

  allTransaction.length = 0;

  localStorage.setItem("allTransaction", JSON.stringify(allTransaction));

  transactionUI();
  calculatUI();
});

searchInput.addEventListener("input", (e) => {
  e.preventDefault();
  let searchValue = searchInput.value.toLowerCase();

  let filteredData = allTransaction.filter((item) => {
    return item.description.toLowerCase().includes(searchValue);
  });

  transactionUI(filteredData);
});

filterSelect.addEventListener("change", () => {
  let selectedType = filterSelect.value;

  if (selectedType === "all") {
    transactionUI(allTransaction);
    return;
  }

  let filteredData = allTransaction.filter((item) => {
    return item.type.toLowerCase() === selectedType;
  });

  transactionUI(filteredData);
});

transactionUI = (data = allTransaction) => {
  transactions.innerHTML = "";
  let users = JSON.parse(localStorage.getItem("users"));
  let symbol = users[0].currencySymbol;

  data.forEach((elem, idx) => {
    transactions.innerHTML += `
      <div class="transactions-box">
        <p>${elem.date}</p>
        <p>${elem.description}</p>
        <p>${elem.category}</p>
        <p class="${elem.type === "Income" ? "income-color" : "expense-color"}">
        ${elem.type === "Income" ? "+" : "-"}${symbol}${elem.amount}
        </p>
        <div class="edit-delete">
          <i onclick="editUI(${idx})" class="ri-pencil-fill"></i>
          <i onclick="deleteUI(${idx})" class="ri-delete-bin-2-fill"></i>
        </div>
      </div>
    `;
  });
};

/*SETTINGS SECTION*/
settingBtn.addEventListener("click", (e) => {
  e.preventDefault();
  settingsPage.style.display = "flex";
  settingBtn.style.backgroundColor = "#dbeafe";
  settingBtn.style.color = "#2563eb";
  dashboardBtn.style.backgroundColor = "#ffffff";
  dashboardBtn.style.color = "black";
  center.style.display = "none";
});

dashboardBtn.addEventListener("click", (e) => {
  e.preventDefault();
  settingsPage.style.display = "none";
  dashboardBtn.style.backgroundColor = "#dbeafe";
  dashboardBtn.style.color = "#2563eb";
  settingBtn.style.backgroundColor = "#ffffff";
  settingBtn.style.color = "black";
  center.style.display = "flex";
});

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let fullName = document.querySelector("#fullName").value;
  let currency = document.querySelector("#currency").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.forEach((user) => {
    user.username = fullName;
    user.currencySymbol = currency;
    username.textContent = user.username;
  });

  localStorage.setItem("users", JSON.stringify(users));
  transactionUI();
});

transactionUI();
calculatUI();

let darkModeBtn = document.querySelector(".darkModeBtn");
let darkModeOn = localStorage.getItem("darkMode");

if (darkModeOn === "yes") {
  document.body.classList.add("dark");
  darkModeBtn.classList.add("active");
}

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  darkModeBtn.classList.toggle("active");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "yes");
  } else {
    localStorage.setItem("darkMode", "no");
  }
});
