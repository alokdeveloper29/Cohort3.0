let productBtn = document.querySelector(".product-btn");
let wrapper = document.querySelector(".wrapper");
let imageUrl = document.querySelector("#imageUrl");
let badge = document.querySelector("#badge");
let productType = document.querySelector("#productType");
let productName = document.querySelector("#productName");
let productPrice = document.querySelector("#productPrice");
let createBtn = document.querySelector(".create-btn");
let cancelBtn = document.querySelector(".cancel-btn");
let productGrid = document.querySelector(".product-grid");
let form = document.querySelector("#form");
let heading = document.querySelector(".heading")
let headingP = document.querySelector(".headingP")

let productArr = JSON.parse(localStorage.getItem("product")) || [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    badge: "New",
    productType: "👟 Shoe",
    productName: "Nike Air Max 270 Running Shoe",
    productPrice: "7499",
    cutoffPrice: "9999",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    badge: "Hot",
    productType: "📱 Mobile",
    productName: "Samsung Galaxy S24 Ultra 5G Smartphone",
    productPrice: "124999",
    cutoffPrice: "134999",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&q=80",
    badge: "Best Seller",
    productType: "🖊️ Pen",
    productName: "Parker Jotter Gold Premium Ballpoint Pen",
    productPrice: "899",
    cutoffPrice: "1199",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    badge: "Sale",
    productType: "💻 Laptop",
    productName: "Apple MacBook Air M2 13-inch Laptop",
    productPrice: "109900",
    cutoffPrice: "119900",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    badge: "Trending",
    productType: "⌚ Watch",
    productName: "Casio Edifice Chronograph Analog Watch",
    productPrice: "5299",
    cutoffPrice: "6999",
  }
]

let productUI = () => {
  productGrid.innerHTML = "";

  productArr.forEach((elem, idx) => {
    productGrid.innerHTML += `<div class="card">
                <div class="card-img">
                    <img src=${elem.imageUrl}
                        alt="" />
                    <span class="badge">${elem.badge}</span>
                </div>
                <div class="card-body">
                    <p class="product-type">${elem.productType}</p>
                    <p class="product-name">${elem.productName}</p>
                    <p class="product-price">${elem.productPrice} <span>${elem.cutoffPrice}</span></p>
                </div>
                <div class="card-buttons">
                    <button onclick="updateCard('${idx}')" class="btn-update">Update</button>
                    <button onclick="deleteCard('${idx}')" class="btn-delete">Delete</button>
                </div>
            </div>`;
  });
};
productUI();


let deleteCard = (idx) => {
  productArr.splice(idx, 1);
  localStorage.setItem("product", JSON.stringify(productArr));
  productUI();
};

cancelBtn.onclick = (e) => {
  e.preventDefault();
  wrapper.style.display = "none";
};

let editIndex = null;

function updateCard(idx){
  editIndex = idx;

  imageUrl.value = productArr[idx].imageUrl;
  badge.value = productArr[idx].badge;
  productType.value = productArr[idx].productType;
  productName.value = productArr[idx].productName;
  productPrice.value = productArr[idx].productPrice;
  cutoffPrice.value = productArr[idx].cutoffPrice;

  heading.innerHTML = `<h1>Update <span>Product</span></h1>`
  headingP.innerHTML = `<p>Fill in the details below to update product card</p>`
  createBtn.innerHTML = "Update Product"
  wrapper.style.display = "flex"
}

createBtn.onclick = (e) => {
  e.preventDefault()

  if (
  imageUrl.value &&
  badge.value &&
  productType.value &&
  productName.value &&
  productPrice.value &&
  cutoffPrice.value
  ){
  console.log("Form valid");
  } else {
  alert("Please fill all fields");
  return;
  }
  let product = {
    imageUrl: imageUrl.value,
    badge: badge.value,
    productType: productType.value,
    productName: productName.value,
    productPrice: productPrice.value,
    cutoffPrice: cutoffPrice.value,
  }
  if(editIndex !== null){
    productArr[editIndex] = product;
    localStorage.setItem("product", JSON.stringify(productArr));
    editIndex = null;
  }
  else{
    productArr.push(product);
    localStorage.setItem("product", JSON.stringify(productArr));
  }
  productUI()
  form.reset();
  wrapper.style.display = "none"

}

productBtn.onclick = (e) => {
  e.preventDefault()
  heading.innerHTML = `<h1 class="heading">Add New <span>Product</span></h1>`
  headingP.innerHTML = `<p>Fill in the details below to create a new product card</p>`
  createBtn.innerHTML = "+ Create Product"
  wrapper.style.display = "flex";
}
