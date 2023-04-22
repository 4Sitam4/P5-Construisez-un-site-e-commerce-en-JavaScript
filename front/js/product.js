// Récupérer l'ID du produit
function getId() {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  return id;
}

// Récupérer les données de l'API associées à l'ID
function fetchProductInfo(id) {
  fetch("http://localhost:3000/api/products/" + id)
    .then((response) => response.json())
    .then((selectProduct) => {
      displayProduct(selectProduct);
    });
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

// ------------------------------------------------------------------------------- //

// Récupérer les données du produit
function getProductData() {
  const id = getId(); // récupérer l'id du produit
  const color = document.querySelector("#colors").value; // récupérer la couleur sélectionnée
  const quantity = document.querySelector("#quantity").value; // récupérer la quantité sélectionnée

  return {
    // retourner les données dans un objet
    id,
    color,
    quantity,
  };
}

// Vérifier que les données sont correctes
function isDataValid(product) {
  if (product.quantity < 1) {
    // vérifier que la quantité est supérieure à 0, si non alert et return false
    alert("Veuillez sélectionner une quantité supérieure à 0");
    return false;
  }
  if (product.color === "") {
    // vérifier que la couleur n'est pas vide, si vide alert et return false
    alert("Veuillez sélectionner une couleur");
    return false;
  }
  return true; // si tout est validé, return true
}

// Récupérer le panier dans le LocalStorage ou créer un panier vide si le panier n'existe pas
function getCartFromLocalStorage() {
  let cart = JSON.parse(localStorage.getItem("cart")); // récupérer le panier dans le LocalStorage
  if (cart === null) {
    // si le panier n'existe pas, créer un panier vide
    cart = [];
  }
  return cart; // si il existe, retourner le panier
}

// Vérifier si le produit est déjà dans le panier
function isProductInCart(cart, product) {
  // pour chaque élément du panier on vérifie si l'id et la couleur correspondent au produit sélectionné par l'utilisateur
  for (let i = 0; i < cart.length; i++) {
    const element = cart[i];
    // si oui on retourne l'index de l'élément
    if (element.id === product.id && element.color === product.color) {
      return i;
    }
  }
  // si non on retourne -1
  return -1;
}

// Ajouter le produit au panier
function addToCart() {
  // Récupération des données du produit
  const product = getProductData();

  // Vérification des données du produit
  if (!isDataValid(product)) {
    return;
  }

  let cart = getCartFromLocalStorage();
  const productIndex = isProductInCart(cart, product);

  if (productIndex >= 0) {
    // si le produit est déjà dans le panier, on ajoute la quantité sélectionnée à la quantité déjà présente
    cart[productIndex].quantity =
      parseInt(cart[productIndex].quantity) + parseInt(product.quantity);
  } else {
    cart.push(product); // si le produit n'est pas dans le panier, on l'ajoute avec la quantité sélectionnée
  }

  localStorage.setItem("cart", JSON.stringify(cart)); // on enregistre le panier dans le LocalStorage
  alert("Le produit a bien été ajouté au panier"); // on affiche un message de confirmation
}

// Listener sur le bouton "Ajouter au panier"
function btnCartListener() {
  const btn = document.querySelector("#addToCart");
  btn.addEventListener("click", addToCart);
}

// Appel des fonctions
var id = getId();
fetchProductInfo(id);
btnCartListener();
