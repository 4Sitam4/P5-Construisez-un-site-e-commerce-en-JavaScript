// Récupérer l'ID du produit
function getId() {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  console.log(id);
  return id;
}

// Définir les emplacements d'insertion des données
function displayProduct(selectProduct) {
  const imgKanap = document.querySelector(".item__img");
  const img = document.createElement("img");
  img.src = selectProduct.imageUrl;
  img.alt = selectProduct.altTxt;
  imgKanap.appendChild(img);

  const nomKanap = document.querySelector("#title");
  nomKanap.innerText = selectProduct.name;

  const prixKanap = document.querySelector("#price");
  prixKanap.innerText = selectProduct.price;

  const descriptionKanap = document.querySelector("#description");
  descriptionKanap.innerText = selectProduct.description;

  const optionKanap = document.querySelector("#colors");
  for (let index = 0; index < selectProduct.colors.length; index++) {
    const option = document.createElement("option");
    option.innerText = selectProduct.colors[index];
    optionKanap.appendChild(option);
  }
  const qtyKanap = document.querySelector("#quantity");
  for (let index = 1; index < 101; index++) {
    const option = document.createElement("option");
    option.innerText = index;
    qtyKanap.appendChild(option);
  }
}

// Récupérer les données de l'API associées à l'ID
function fetchProductInfo(id) {
  fetch("http://localhost:3000/api/products/" + id)
  .then(response => response.json())
  .then(selectProduct => {
    console.log(selectProduct);
    displayProduct(selectProduct);
  });
}


// Appel des fonctions
var id = getId();
fetchProductInfo(id);

// fetch("http://localhost:3000/api/products/" + id)
//   .then(response => response.json())
//   .then(selectProduct => {
//     console.log(selectProduct)});