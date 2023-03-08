// Récupérer l'ID du produit
const url = new URL(window.location.href);
const id = url.searchParams.get("id");
console.log(id);

// Définir les emplacements d'insertion des données
const imgKanap = document.querySelector(".item__img");
const nomKanap = document.querySelector("#title");
const prixKanap = document.querySelector("#price");
const descriptionKanap = document.querySelector("#description");
const optionKanap = document.querySelector("#colors");
const qtyKanap = document.querySelector("#quantity");

// Récupérer les données de l'API associées à l'ID
fetch("http://localhost:3000/api/products/" + id)
  .then(response => response.json())
  .then(selectProduct => {
    console.log(selectProduct)});