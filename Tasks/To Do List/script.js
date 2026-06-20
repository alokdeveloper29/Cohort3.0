let input = document.querySelector("#input");
let addBtn = document.querySelector("#addBtn");
let allTask = document.querySelector(".allTask");
let deleteBox = document.querySelector(".deleteBox");
let deleteBtn = document.querySelector(".deleteBtn");
let cancelBtn = document.querySelector(".cancelBtn");
let editBox = document.querySelector(".editBox");
let editInput = document.querySelector("#editInput");
let done = document.querySelector(".done");
let time = document.querySelector("#time");

setInterval(() => {
  time.innerHTML = new Date().toLocaleTimeString("en-US");
}, 1000);

let task = [
  "Finish HTML Layout",
  "Add CSS Styling",
  "Implement JavaScript Logic",
  "Push Code to GitHub"
];

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value.trim() == "") {
    return;
  }
  task.push(input.value);
  taskUi();
  input.value = "";
});

let taskUi = () => {
  allTask.innerHTML = "";
  task.forEach((elem, idx) => {
    allTask.innerHTML += `<div class="task-list">
              <div class="task">
                <span>${elem}</span>
                <div class="delete-edit">
                    <button onclick="editTask('${elem}', '${idx}')"><i class="ri-edit-2-fill"></i></button>
                    <button onclick="deleteTask('${idx}')"><i class="ri-delete-bin-fill"></i></button>
                </div>
              </div>`;
  });
};
taskUi()

let deleteTask = (idx) => {
  deleteBox.style.display = "flex";

  deleteBtn.onclick = () => {
    task.splice(idx, 1);
    deleteBox.style.display = "none";
    taskUi();
  };

  cancelBtn.onclick = () => (deleteBox.style.display = "none");
};

let editTask = (elem, idx) => {
  editBox.style.display = "flex";
  editInput.value = `${elem}`;

  done.onclick = () => {
    task[idx] = editInput.value;
    editBox.style.display = "none";
    taskUi();
  };
};
