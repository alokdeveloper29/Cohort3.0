//   TASK MANAGER — DOM Explorer Assignment

// ── DOM ELEMENTS ──
let taskTitle      = document.getElementById("taskTitle");
let taskDesc       = document.getElementById("taskDesc");
let taskCategory   = document.getElementById("taskCategory");
let taskDate       = document.getElementById("taskDate");
let submitBtn      = document.getElementById("submitBtn");
let clearAllBtn    = document.getElementById("clearAllBtn");
let taskList       = document.getElementById("taskList");
let searchInput    = document.getElementById("searchInput");
let searchBtn      = document.querySelector(".search-section > button");
let totalCount     = document.getElementById("totalCount");
let pendingCount   = document.getElementById("pendingCount");
let completedCount = document.getElementById("completedCount");
let themeToggle    = document.getElementById("themeToggle");

// ── EDIT STATE — kaunsa card edit ho raha hai ──
let editingCard = null;


//   THEME TOGGLE
//   classList, dataset, setAttribute use

themeToggle.addEventListener("click", function () {
  let html = document.documentElement;
  let currentTheme = themeToggle.dataset.theme;

  if (currentTheme === "light") {
    html.setAttribute("data-theme", "dark");
    themeToggle.setAttribute("data-theme", "dark");
    themeToggle.innerText = "☀️ Light Mode";
  } else {
    html.setAttribute("data-theme", "light");
    themeToggle.setAttribute("data-theme", "light");
    themeToggle.innerText = "🌙 Dark Mode";
  }

  document.body.classList.toggle("dark-mode");
});

//   ATTRIBUTES vs PROPERTIES DEMO

let demoInput  = document.getElementById("demoInput");
let demoBtn    = document.getElementById("demoBtn");
let propResult = document.getElementById("propResult");
let attrRes    = document.getElementById("attrRes");

demoBtn.addEventListener("click", function () {
  propResult.innerText = demoInput.value;

  attrRes.innerText = demoInput.getAttribute("value");
});


//   HELPER FUNCTIONS
// Validate inputs
function getInputValues() {
  let title    = taskTitle.value.trim();
  let desc     = taskDesc.value.trim();
  let category = taskCategory.value;
  let date     = taskDate.value;

  if (!title) {
    alert("Please enter a task title!");
    taskTitle.focus();
    return null;
  }

  return { title, desc, category, date };
}


function clearForm() {
  taskTitle.value = "";
  taskDesc.value = "";
  taskCategory.value = "Study";
  taskDate.value = "";
  editingCard = null;
  submitBtn.innerText = "Add Task";
  submitBtn.style.background = "";
}


function removeEmptyState() {
  let emptyState = taskList.querySelector(".empty-state");
  if (emptyState) emptyState.remove();
}

function checkEmptyState() {
  let cards = taskList.querySelectorAll(".task-card");
  if (cards.length === 0) {
    let empty = document.createElement("div");
    empty.classList.add("empty-state");
    empty.innerText = "No tasks yet. Add your first task above! 👆";
    taskList.append(empty);
  }
}

// Update counters
function updateCounters() {
  let allCards = taskList.querySelectorAll(".task-card");
  let completedCards = taskList.querySelectorAll(".task-card.completed");

  totalCount.innerText = allCards.length;
  completedCount.innerText = completedCards.length;
  pendingCount.innerText = allCards.length - completedCards.length;
}

//   CREATE TASK CARD

function createTaskCard(title, desc, category, date) {

  let card = document.createElement("div");
  card.classList.add("task-card", `category-${category}`);

  let taskLeft = document.createElement("div");
  taskLeft.classList.add("task-left");

  let titleEl = document.createElement("p");
  titleEl.classList.add("task-title");
  titleEl.innerText = title;

  let descEl = document.createElement("p");
  descEl.classList.add("task-desc");
  descEl.innerText = desc || "No description.";

  let taskMeta = document.createElement("div");
  taskMeta.classList.add("task-meta");

  let badge = document.createElement("span");
  badge.classList.add("category-badge", category);
  badge.innerText = category;

  let dueDateEl = document.createElement("span");
  dueDateEl.classList.add("due-date");
  dueDateEl.innerText = date ? `📅 ${date}` : "📅 No due date";

  taskMeta.append(badge, dueDateEl);
  taskLeft.append(titleEl, descEl, taskMeta);

  let taskButtons = document.createElement("div");
  taskButtons.classList.add("task-buttons");

  let editBtn = document.createElement("button");
  editBtn.classList.add("btn-edit");
  editBtn.innerText = "✏️ Edit";
  editBtn.setAttribute("aria-label", "Edit task");

  let completeBtn = document.createElement("button");
  completeBtn.classList.add("btn-complete");
  completeBtn.innerText = "✅ Complete";
  completeBtn.setAttribute("aria-label", "Complete task");

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn-delete");
  deleteBtn.innerText = "🗑️ Delete";
  deleteBtn.setAttribute("aria-label", "Delete task");

  taskButtons.append(editBtn, completeBtn, deleteBtn);
  card.append(taskLeft, taskButtons);



  editBtn.addEventListener("click", function () {

    taskTitle.value    = titleEl.innerText;
    taskDesc.value     = descEl.innerText === "No description." ? "" : descEl.innerText;
    taskCategory.value = badge.innerText;
    taskDate.value     = dueDateEl.innerText.replace("📅 ", "").trim() === "No due date"
                         ? ""
                         : dueDateEl.innerText.replace("📅 ", "").trim();

    editingCard = card;

    submitBtn.innerText = "Update Task ✅";
    submitBtn.style.background = "#f59e0b";

    document.querySelector(".form-section").scrollIntoView({ behavior: "smooth" });
  });

  // ── COMPLETE ──
  completeBtn.addEventListener("click", function () {
    card.classList.toggle("completed");
    completeBtn.innerText = card.classList.contains("completed")
      ? "↩️ Undo"
      : "✅ Complete";
    updateCounters();
  });

  //  --DELETE--
  deleteBtn.addEventListener("click", function () {
    if (editingCard === card) clearForm();

    card.remove();
    checkEmptyState();
    updateCounters();
  });

  return card;
}


//   SUBMIT BUTTON
//   Add mode  → append() se naya task
//   Edit mode → existing card update karo

submitBtn.addEventListener("click", function () {
  let data = getInputValues();
  if (!data) return;

  // ── EDIT MODE ──
  if (editingCard !== null) {

    let titleEl   = editingCard.querySelector(".task-title");
    let descEl    = editingCard.querySelector(".task-desc");
    let badge     = editingCard.querySelector(".category-badge");
    let dueDateEl = editingCard.querySelector(".due-date");

    titleEl.innerText   = data.title;
    descEl.innerText    = data.desc || "No description.";
    dueDateEl.innerText = data.date ? `📅 ${data.date}` : "📅 No due date";

    badge.innerText = data.category;
    badge.className = `category-badge ${data.category}`;

    editingCard.className = `task-card category-${data.category}`;
    if (editingCard.classList.contains("completed")) {
      editingCard.classList.add("completed");
    }

    clearForm();
    updateCounters();
    return;
  }

  // ── ADD MODE ──
  removeEmptyState();

  // DocumentFragment use — efficient DOM manipulation
  let fragment = document.createDocumentFragment();
  let card = createTaskCard(data.title, data.desc, data.category, data.date);
  fragment.append(card);

  taskList.append(fragment);

  updateCounters();
  clearForm();
});


//   CLEAR ALL — 

clearAllBtn.addEventListener("click", function () {
  if (!confirm("Delete all tasks?")) return;

  let newList = document.createElement("div");
  newList.classList.add("task-list");
  newList.id = "taskList";

  let empty = document.createElement("div");
  empty.classList.add("empty-state");
  empty.innerText = "No tasks yet. Add your first task above! 👆";
  newList.append(empty);

  taskList.replaceWith(newList); 
  taskList = newList;

  clearForm(); 
  updateCounters();
});


//   SEARCH

function doSearch() {
  let query    = searchInput.value.toLowerCase().trim();
  let allCards = taskList.querySelectorAll(".task-card");

  allCards.forEach(function (card) {
    let title = card.querySelector(".task-title").innerText.toLowerCase();
    let desc  = card.querySelector(".task-desc").innerText.toLowerCase();

    card.style.display = (title.includes(query) || desc.includes(query))
      ? "flex"
      : "none";
  });
}

searchBtn.addEventListener("click", doSearch);
searchInput.addEventListener("input", doSearch);


//   EVENT DELEGATION

document.addEventListener("click", function (e) {
  if (e.target.closest(".task-card")) {
    console.log("Event Delegation: Click handled from document-level listener");
  }
});


//   EVENT PROPAGATION DEMO
let grandparent  = document.getElementById("grandparent");
let bubblingTab  = document.getElementById("bubblingTab");
let capturingTab = document.getElementById("capturingTab");
let eventDesc    = document.getElementById("eventDesc");
let eventLog     = document.getElementById("eventLog");
let clearLog     = document.getElementById("clearLog");

let isBubbling = true;

function logEvent(msg, type) {
  let placeholder = eventLog.querySelector(".log-placeholder");
  if (placeholder) placeholder.remove();

  let p = document.createElement("p");
  p.classList.add(type);
  p.innerText = msg;
  eventLog.prepend(p);

  if (eventLog.children.length > 9) {
    eventLog.lastChild.remove();
  }

  console.log(msg);
}

function setupPropagation() {
  let newGrand = grandparent.cloneNode(true);
  grandparent.replaceWith(newGrand);
  grandparent = document.getElementById("grandparent");

  let newParent = grandparent.querySelector("#parent");
  let newChild  = grandparent.querySelector("#childBtn");

  if (isBubbling) {
    newChild.addEventListener("click", function () {
      logEvent("1️⃣  Child clicked", "log-child");
    }, false);

    newParent.addEventListener("click", function () {
      logEvent("2️⃣  Bubbled → Parent", "log-parent");
    }, false);

    grandparent.addEventListener("click", function () {
      logEvent("3️⃣  Bubbled → Grandparent", "log-grand");
    }, false);

  } else {
    grandparent.addEventListener("click", function () {
      logEvent("1️⃣  Capturing → Grandparent", "log-grand");
    }, true);

    newParent.addEventListener("click", function () {
      logEvent("2️⃣  Capturing → Parent", "log-parent");
    }, true);

    newChild.addEventListener("click", function () {
      logEvent("3️⃣  Capturing → Child (target)", "log-child");
    }, true);
  }
}

setupPropagation();

bubblingTab.addEventListener("click", function () {
  isBubbling = true;
  bubblingTab.classList.add("active");
  capturingTab.classList.remove("active");
  eventDesc.innerHTML = "<strong>Bubbling:</strong> Child → Parent → Grandparent (default)";
  eventLog.innerHTML  = '<p class="log-placeholder">Click the button to see propagation order...</p>';
  setupPropagation();
});

capturingTab.addEventListener("click", function () {
  isBubbling = false;
  capturingTab.classList.add("active");
  bubblingTab.classList.remove("active");
  eventDesc.innerHTML = "<strong>Capturing:</strong> Grandparent → Parent → Child";
  eventLog.innerHTML  = '<p class="log-placeholder">Click the button to see propagation order...</p>';
  setupPropagation();
});

clearLog.addEventListener("click", function () {
  eventLog.innerHTML = '<p class="log-placeholder">Click the button to see propagation order...</p>';
});

// ── INITIAL ──
updateCounters();