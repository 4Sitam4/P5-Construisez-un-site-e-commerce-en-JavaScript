// Récupérer l'ID du produit
function getId() {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  console.log(id);
  return id;
}

// Définir les emplacements d'insertion des données
function displayProduct() {
  const imgKanap = document.querySelector(".item__img");
  const nomKanap = document.querySelector("#title");
  const prixKanap = document.querySelector("#price");
  const descriptionKanap = document.querySelector("#description");
  const optionKanap = document.querySelector("#colors");
  const qtyKanap = document.querySelector("#quantity");
}

// Récupérer les données de l'API associées à l'ID
function fetchProductInfo(id) {
  fetch("http://localhost:3000/api/products/" + id)
    .then(response => response.json())
    .then(selectProduct => {
      console.log(selectProduct);
    });
}
// Appel des fonctions
var id = getId();
fetchProductInfo(id);

// fetch("http://localhost:3000/api/products/" + id)
//   .then(response => response.json())
//   .then(selectProduct => {
//     console.log(selectProduct)});