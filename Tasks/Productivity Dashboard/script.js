let main = document.querySelector("main");
let app1 = document.querySelector(".app1");
let app2 = document.querySelector(".app2");
let app3 = document.querySelector(".app3");
let app4 = document.querySelector(".app4");
let app5 = document.querySelector(".app5");

let quoteContainer = document.querySelector(".quote-container");
let timerPage = document.querySelector(".timer-page");
let taskPage = document.querySelector(".task-page");
let planner = document.querySelector(".planner");
let goalPage = document.querySelector(".goal-page");

app1.addEventListener("click", () => {
  quoteContainer.style.display = "flex";
  main.style.display = "none";
});
app2.addEventListener("click", () => {
  timerPage.style.display = "flex";
  main.style.display = "none";
});
app3.addEventListener("click", () => {
  taskPage.style.display = "flex";
  main.style.display = "none";
});
app4.addEventListener("click", () => {
  planner.style.display = "flex";
  main.style.display = "none";
});
app5.addEventListener("click", () => {
  goalPage.style.display = "flex";
  main.style.display = "none";
});

let quoteBtn = document.querySelector(".quoteBtn");
let timerBtn = document.querySelector(".timerBtn");
let taskBtn = document.querySelector(".taskBtn");
let plannerBtn = document.querySelector(".plannerBtn");
let goalBtn = document.querySelector(".goalBtn");

quoteBtn.addEventListener("click", () => {
  main.style.display = "flex";
  quoteContainer.style.display = "none";
});
timerBtn.addEventListener("click", () => {
  main.style.display = "flex";
  timerPage.style.display = "none";
});
taskBtn.addEventListener("click", () => {
  main.style.display = "flex";
  taskPage.style.display = "none";
});
plannerBtn.addEventListener("click", () => {
  main.style.display = "flex";
  planner.style.display = "none";
});
goalBtn.addEventListener("click", () => {
  main.style.display = "flex";
  goalPage.style.display = "none";
});

//----Weather + Clock Card -------
const dateEl = document.querySelector("#date");
const timeEl = document.querySelector("#time");
const tempEl = document.querySelector("#temp");
const conditionEl = document.querySelector("#condition");
const heatEl = document.querySelector("#heat");
const humidityEl = document.querySelector("#humidity");
const windEl = document.querySelector("#wind");
let destopImage = document.querySelector("#destopImage")

// Prayagraj Coordinates
const latitude = 25.4358;
const longitude = 81.8463;

// Time Update
function updateDateTime() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    destopImage.src = "./morning.jpg"
  }
  else if (hour >= 12 && hour < 17) {
    destopImage.src = "./afternoon.jpg"
  }
  else if (hour >= 17 && hour < 20) {
    destopImage.src = "./evening.jpg"
  }
  else {
    destopImage.src = "./night.jpg"
  }
  const dateOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const day = now.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const time = now.toLocaleTimeString();
  dateEl.innerHTML = now.toLocaleDateString("en-US", dateOptions);
  timeEl.innerHTML = `
        ${day}, ${time}<br>
        ${
          now
            .toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            .split(" ")[1]
        }
    `;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Weather Update
async function getWeather() {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`,
    );

    const data = await response.json();
    tempEl.innerHTML = `${data.current.temperature_2m}°C`;
    conditionEl.innerHTML = "Current Weather";
    heatEl.innerHTML = `Heat Index: ${data.current.apparent_temperature}°C`;
    humidityEl.innerHTML = `Humidity: ${data.current.relative_humidity_2m}%`;
    windEl.innerHTML = `Wind: ${data.current.wind_speed_10m} km/h`;
  } catch (error) {
    console.log(error);
  }
}
getWeather();
setInterval(getWeather, 600000); // 10 min



//--QUOTE PAGE--
let quote = document.querySelector(".quote");
let author = document.querySelector(".author");
let getQuoteBtn = document.querySelector(".getQuoteBtn");
async function getQuote() {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();
    quote.innerHTML = data.quote;
    author.innerHTML = data.author;
  } catch (error) {
    console.log(error);
  }
}
getQuoteBtn.addEventListener("click", () => {
  getQuote();
});


//--TIMER PAGE--
let start = document.querySelector("#start");
let pause = document.querySelector("#pause");
let reset = document.querySelector("#reset");
let timer = document.querySelector(".timer");
let timerS;
let num = 25;
start.addEventListener("click", () => {
  clearInterval(timerS);
  timer.innerHTML = `${num}:00`;
  timerS = setInterval(() => {
    num--;
    timer.innerHTML = `${num}:00`;
    if (num <= 0) {
      clearInterval(timerS);
      num = 25;
    }
  }, 1000);
});
pause.addEventListener("click", () => {
  clearInterval(timerS);
});
reset.addEventListener("click", () => {
  clearInterval(timerS);
  num = 26;
  timerS = setInterval(() => {
    num--;
    timer.innerHTML = `${num}:00`;
    if (num <= 0) {
      clearInterval(timerS);
    }
  }, 1000);
});


//--TASK PAGE--
let taskForm = document.querySelector("#taskForm");
let rightPanel = document.querySelector(".right-panel");
let checkbox = document.querySelector("#important");
let allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let tasks = {
    taskTitle: taskForm[0].value.trim(),
    taskDescription: taskForm[1].value.trim(),
    markImportant: checkbox.checked,
  };
  if (tasks.taskTitle === "" || tasks.taskDescription === "") {
    alert("Please fill all required fields.");
    return;
  }

  allTasks.push(tasks);
  localStorage.setItem("allTasks", JSON.stringify(allTasks));

  taskUI();
  taskForm.reset();
});
let taskUI = () => {
  rightPanel.innerHTML = "";
  allTasks.forEach((elem, index) => {
    rightPanel.innerHTML += `<div class="task-card">
            <span id="task${index}" style="${elem.markImportant ? "color:red" : "color:black"}" >${elem.taskTitle} </span>
            <p>${elem.taskDescription}</p>
            <div>
                <button onclick="document.querySelector('#task${index}').style.textDecoration='line-through'">Mark as Completed</button>
                <button onclick="deleteTaskUI(${index})">Delete</button>
            </div>
          </div>`;
  });
};
taskUI();
let deleteTaskUI = (idx) => {
  allTasks.splice(idx, 1);
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
  taskUI();
};


//--PlANNER--
for (let i = 1; i <= 18; i++) {
  let planner = document.querySelector(`.planner${i}`);

  planner.value = localStorage.getItem(`planner${i}`) || "";

  planner.addEventListener("input", () => {
    localStorage.setItem(`planner${i}`, planner.value);
  });
}


//--GOAL-PAGE--
let goalDisplay = document.querySelector(".goal-display");
let goalForm = document.querySelector(".goal-form");

let allGoals = JSON.parse(localStorage.getItem("allGoals")) || [];
goalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let goals = {
    goalTitle: goalForm[0].value,
    goalDescription: goalForm[1].value,
  };
  if (goals.goalTitle === "" || goals.goalDescription === "") {
    alert("Please fill all required fields.");
    return;
  }
  allGoals.push(goals);
  localStorage.setItem("allGoals", JSON.stringify(allGoals));
  goalUI();
});

let goalUI = () => {
  goalDisplay.innerHTML = "";
  allGoals.forEach((elem, index) => {
    goalDisplay.innerHTML += `<div class="goal-card">
            <h3>${elem.goalTitle} <button onclick="deleteGoalUI(${index})">Delete</button></h3>
            <p>${elem.goalDescription}</p>
          </div>`;
  });
  goalForm.reset();
};
goalUI();

let deleteGoalUI = (idx) => {
  allGoals.splice(idx, 1);
  localStorage.setItem("allGoals", JSON.stringify(allGoals));
  goalUI();
};


