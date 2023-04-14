// Récupérer l'ID du produit
function getId() {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  console.log(id);
  return id;
}

// Définir les emplacements d'insertion des données
function displayProduct(selectProduct) {
  // création de la balise img dans le html et insertion de l'image
  const imgKanap = document.querySelector(".item__img");
  const img = document.createElement("img");
  img.src = selectProduct.imageUrl;
  img.alt = selectProduct.altTxt;
  imgKanap.appendChild(img);

  // insertion du nom du produit dans la balise h1
  const nomKanap = document.querySelector("#title");
  nomKanap.innerText = selectProduct.name;

  // insertion du prix du produit dans la balise p
  const prixKanap = document.querySelector("#price");
  prixKanap.innerText = selectProduct.price;

  // insertion de la description du produit dans la balise p
  const descriptionKanap = document.querySelector("#description");
  descriptionKanap.innerText = selectProduct.description;

  // insertion des options de couleurs dans la balise select
  const optionKanap = document.querySelector("#colors");
  for (let index = 0; index < selectProduct.colors.length; index++) {
    const option = document.createElement("option");
    option.innerText = selectProduct.colors[index];
    optionKanap.appendChild(option);
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