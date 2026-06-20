let username = document.querySelector("#username");
let email = document.querySelector("#email");
let imageUrl = document.querySelector("#imageUrl");
let form = document.querySelector("#form");
let cardContainer = document.querySelector("#cardContainer");
let submitBtn = document.querySelector("#submitBtn");
let deleteBox = document.querySelector(".deleteBox");
let deleteBtn = document.querySelector(".deleteBtn");
let cancelBtn = document.querySelector(".cancelBtn");

let users = [
  {
    username: "Alok Kumar",
    email: "alok@gmail.com",
    imageUrl: "https://i.pravatar.cc/300?img=1"
  },
  {
    username: "Rahul Sharma",
    email: "rahul@gmail.com",
    imageUrl: "https://i.pravatar.cc/300?img=2"
  },
  {
    username: "Priya Sharma",
    email: "priya@gmail.com",
    imageUrl: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    username: "Aman Verma",
    email: "aman@gmail.com",
    imageUrl: "https://i.pravatar.cc/300?img=4"
  },
  {
    username: "Neha Gupta",
    email: "neha@gmail.com",
    imageUrl: "https://i.pravatar.cc/300?img=5"
  }
];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addUser();
  form.reset();
  cardUi();
});

let addUser = () => {
  for (let elem of users) {
    if (
      username.value == elem.username &&
      email.value == elem.email &&
      imageUrl.value == elem.imageUrl
    ) {
      console.log("is match");
      return;
    }
  }

  users.push({
    username: username.value,
    email: email.value,
    imageUrl: imageUrl.value,
  });
};

let cardUi = () => {
  cardContainer.innerHTML = "";

  users.forEach((elem, idx) => {
    cardContainer.innerHTML += `<div class="card">
    <img src=${elem.imageUrl} alt="" />

    <div class="card-content">
        <h2>${elem.username} </h2>
        <p>${elem.email}</p>
        <div class="card-footer">
            <div class="stats">
                <span>👤 ${Math.floor(Math.random() * 100)}</span>
                <span>👁 ${Math.floor(Math.random() * 1000)}</span>
            </div>
            <button class="follow-btn">Follow +</button>
        </div>
        <div class="delete-edit">
            <h3 onclick="deleteCard('${idx}')">Delete</h3>
            <h3 onclick="editCard('${idx}')">Edit</h3>
        </div>
        </div>
  
  </div>`;
  });
};
cardUi();

deleteCard = (idx) => {
  deleteBox.style.display = "flex"
  deleteBtn.onclick = () => {
    users.splice(idx, 1);
    deleteBox.style.display = "none"
    cardUi()
  }
  cancelBtn.onclick = () => {
    deleteBox.style.display = "none"
  }
};

editCard = (idx) => {
  username.value = users[idx].username;
  email.value = users[idx].email;
  imageUrl.value = users[idx].imageUrl;

  submitBtn.addEventListener("click", () => {
    users[idx] = {
      username: username.value,
      email: email.value,
      imageUrl: imageUrl.value,
    };
  });
  
};
