// Récupérer les données du panier
function getCart() {
  const cart = localStorage.getItem("cart");
  if (cart === null) {
    // si le panier n'existe pas, créer un panier vide
    return [];
  } else {
    return JSON.parse(cart); // si le panier existe, retourner le panier
  }
}

// Récupérer les données complètes des produits dans le panier
async function fetchProductInfoFromCart() {
  const cart = getCart();
  if (cart.length === 0) {
    // si le panier est vide, afficher un message d'erreur
    alert("Votre panier est vide");
    return;
  }

  cart.forEach(async ({id, quantity, color}) => {
    // pour chaque élément du panier, récupérer les données du produit

    try {
      const response = await fetch("http://localhost:3000/api/products/" + id);
      const data = await response.json();

      const product = {
        // créer un objet avec les données du produit
        id,
        title: data.name,
        price: data.price,
        quantity,
        color,
        imageUrl: data.imageUrl,
        altTxt: data.altTxt,
      };

      displayCart(product); // appeler la fonction displayCart pour afficher les données du produit
    } catch (error) {
      // si une erreur est survenue, afficher un message d'erreur
      console.error("Erreur:", error);
    }
  });

  await totalPrice(); // appeler la fonction totalPrice après avoir récupéré les informations des produits
}

// ----------------------------------- displayCart ----------------------------------- //
// ------------------- Afficher les données des produits dans le panier -------------- //

// Crée et retourne un élément article pour un élément du panier
function createArticleElement(cartData) {
  // Créer un élément article puis lui ajouter les attributs data-id, data-color et la classe cart__item
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.setAttribute("data-id", cartData.id);
  article.setAttribute("data-color", cartData.color);
  return article;
}

// Crée et retourne un div contenant l'image de l'élément du panier
function createImageDiv(cartData) {
  // Créer un élément div puis lui ajouter la classe cart__item__img
  const imgDiv = document.createElement("div");
  imgDiv.classList.add("cart__item__img");

  // Créer un élément img puis lui ajouter les attributs src et alt
  const img = document.createElement("img");
  img.src = cartData.imageUrl;
  img.alt = cartData.altTxt;

  // Ajouter l'élément img à la div et retourner la div complète
  imgDiv.appendChild(img);
  return imgDiv;
}

// Crée et retourne un div contenant les informations et paramètres de l'élément du panier
function createContentDiv(cartData) {
  // Créer un élément div puis lui ajouter la classe cart__item__content
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("cart__item__content");

  // Créer les div description et settings puis les ajouter à la div content
  const descriptionDiv = createDescriptionDiv(cartData);
  const settingsDiv = createSettingsDiv(cartData);
  contentDiv.appendChild(descriptionDiv);
  contentDiv.appendChild(settingsDiv);

  // Retourner la div complète
  return contentDiv;
}

// Crée et retourne une div contenant la description de l'élément du panier
function createDescriptionDiv(cartData) {
  // Créer un élément div puis lui ajouter la classe cart__item__content__description
  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("cart__item__content__description");

  // Créer les éléments h2, p (color) et p (price) puis les ajouter à la div description
  const title = document.createElement("h2");
  title.textContent = cartData.title;

  const color = document.createElement("p");
  color.textContent = cartData.color;

  const price = document.createElement("p");
  price.textContent = cartData.price + " €";

  descriptionDiv.appendChild(title);
  descriptionDiv.appendChild(color);
  descriptionDiv.appendChild(price);

  // Retourner la div complète
  return descriptionDiv;
}

// Crée et retourne un div contenant les paramètres de l'élément du panier
function createSettingsDiv(cartData) {
  // Créer un élément div puis lui ajouter la classe cart__item__content__settings
  const settingsDiv = document.createElement("div");
  settingsDiv.classList.add("cart__item__content__settings");

  // Créer les div quantity et delete puis les ajouter à la div settings
  const quantityDiv = createQuantityDiv(cartData);
  const deleteDiv = createDeleteDiv();

  settingsDiv.appendChild(quantityDiv);
  settingsDiv.appendChild(deleteDiv);

  // Retourner la div complète
  return settingsDiv;
}

// Crée et retourne un div pour modifier la quantité de l'élément du panier
function createQuantityDiv(cartData) {
  // Créer un élément div puis lui ajouter la classe cart__item__content__settings__quantity
  const quantityDiv = document.createElement("div");
  quantityDiv.classList.add("cart__item__content__settings__quantity");

  // Créer les éléments p et input puis les ajouter à la div quantity
  const quantity = document.createElement("p");
  quantity.textContent = "Qté : ";

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.name = "itemQuantity";
  quantityInput.min = "1";
  quantityInput.max = "100";
  quantityInput.value = cartData.quantity;
  quantityInput.classList.add("itemQuantity");

  quantityDiv.appendChild(quantity);
  quantityDiv.appendChild(quantityInput);

  // Retourner la div complète
  return quantityDiv;
}

// Crée et retourne un div pour supprimer l'élément du panier
function createDeleteDiv() {
  // Créer un élément div puis lui ajouter la classe cart__item__content__settings__delete
  const deleteDiv = document.createElement("div");
  deleteDiv.classList.add("cart__item__content__settings__delete");

  // Créer un élément p puis lui ajouter la classe deleteItem et le texte "Supprimer" puis l'ajouter à la div delete
  const deleteBtn = document.createElement("p");
  deleteBtn.classList.add("deleteItem");
  deleteBtn.textContent = "Supprimer";

  deleteDiv.appendChild(deleteBtn);

  // Retourner la div complète
  return deleteDiv;
}

// Fonction principale pour afficher les éléments du panier
function displayCart(cartData) {
  // Crée un élément article pour l'élément du panier
  const article = createArticleElement(cartData);

  // Crée un div contenant l'image de l'élément du panier
  const imgDiv = createImageDiv(cartData);

  // Crée un div contenant les informations et paramètres de l'élément du panier
  const contentDiv = createContentDiv(cartData);

  // Ajoute l'image et les informations/paramètres à l'élément article
  article.appendChild(imgDiv);
  article.appendChild(contentDiv);

  // Ajoute l'élément article au conteneur des éléments du panier
  document.getElementById("cart__items").appendChild(article);

  // Met à jour les écouteurs d'événements et les informations du panier
  attachEventListeners();
}

// ------------------------------ deleteItem ----------------------------------- //
// Supprimer un produit du panier
function deleteItem() {
  // Récupérer l'id du produit
  const id =
    this.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id");
  // Récupérer la couleur du produit
  const color =
    this.parentNode.parentNode.parentNode.parentNode.getAttribute("data-color");
  // Récupérer les données du panier
  const cart = getCart(); 
  // forEach pour trouver le produit à supprimer
  cart.forEach((item, index) => {
    if (item.id === id && item.color === color) { 
      cart.splice(index, 1); 
    }
  });
  // Mettre à jour le panier
  localStorage.setItem("cart", JSON.stringify(cart));
  // display none du produit supprimé (pour éviter un rechargement de la page)
  this.parentNode.parentNode.parentNode.parentNode.style.display = "none";

  // appel updateCart pour mettre à jour le panier
  updateCart();
}

// Event listener pour le bouton de suppression
function deleteItemListener() {
  const deleteBtn = document.getElementsByClassName("deleteItem");
  Array.from(deleteBtn).forEach((btn) => {
    // forEach pour ajouter l'event listener à chaque bouton
    btn.addEventListener("click", deleteItem);
  });
}

// ------------------------------ modifier la qty  ----------------------------------- //
// Modifier la quantité d'un produit
function changeQuantity() {
  // Récupérer l'id du produit
  const id =
    this.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id");
  // Récupérer la couleur du produit
  const color =
    this.parentNode.parentNode.parentNode.parentNode.getAttribute("data-color");
  // Récupérer les données du panier
  const cart = getCart();
  // forEach pour trouver le produit à modifier
  cart.forEach(item => {
    if (item.id === id && item.color === color) {
      item.quantity = this.value;
    }
  });
  // Mettre à jour le panier du localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  // appel updateCart pour mettre à jour le panier
  updateCart();
}

// Event listener pour l'input de quantité
function changeQuantityListener() {
  const quantityInput = document.getElementsByClassName("itemQuantity");
  Array.from(quantityInput).forEach(input => { // forEach pour ajouter l'event listener à chaque input
    input.addEventListener("change", changeQuantity);
  });
}

// ------------------------------ --- ----------------------------------- //

// ------------------------------ totalPrice ----------------------------------- //
// Calculer le prix total du panier puis appel la fonction displayTotalPrice pour afficher le prix total
async function totalPrice() {
  const cart = getCart(); // récupérer les données du panier
  let total = 0; // initialiser le prix total à 0

  await Promise.all(cart.map(async ({id, quantity}) => {
    // map pour récupérer les données de chaque produit

    try {
      // récupérer les données du produit
      const response = await fetch("http://localhost:3000/api/products/" + id);
      const data = await response.json();

      total += data.price * quantity; // calculer le prix total
    } catch (error) {
      // afficher l'erreur en cas d'erreur
      console.error("Erreur:", error);
    }
  }));

  displayTotalPrice(total); // appel la fonction displayTotalPrice pour afficher le prix total
}

function displayTotalPrice(total) {
  // Afficher le prix total
  document.getElementById("totalPrice").textContent = total;
}
// ------------------------------ --- ----------------------------------- //

// ------------------------------ Total des produits dans le panier ----------------------------------- //
// Calculer le nombre total de produits dans le panier et l'afficher
function totalQuantity() {
  // Récupérer les données du panier
  const cart = getCart();
  // Initialiser le nombre total de produits
  let total = 0;
  // forEach pour calculer le nombre total de produits
  cart.forEach(item => {
    total += parseInt(item.quantity);
  });

  // Afficher le nombre total de produits
  document.getElementById("totalQuantity").textContent = total;
}

// Function pour mettre à jour tous le visuel du panier (prix total, nombre de produits, etc...)
function updateCart() {
  // Mettre à jour le prix total
  totalPrice();
  // Mettre à jour le nombre d'articles dans le panier
  totalQuantity();
}

// ------------------------------ Formulaire de commande client ----------------------------------- //
// Récupérer et valider les données du formulaire
function getAndValidateForm() {
  // Récupérer les données du formulaire
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;

  // regex pour l'email (2 à 50 caractères, accepte les chiffres, les lettres, les espaces, les tirets vérifie la présence d'un @ et d'un .)
  const regexMail = /^[A-Za-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

  // regex pour le nom et le prénom
  // (2 à 15 caractères, pas de chiffres, pas de caractères spéciaux, accepte les espaces et les tirets)
  const regexName = /^(?=.{2,15}$)[A-Za-z]+([- ]?[A-Za-z]+)*$/;

  // regex pour l'adresse (5 à 50 caractères, accepte les chiffres, les lettres, les espaces et les tirets)
  const regexAddress = /^[A-Za-z0-9 -]{5,50}$/;

  // regex pour la ville (2 à 50 caractères, accepte les lettres, les espaces et les tirets)
  const regexCity = /^[A-Za-z -]{2,50}$/;

  // Valider les données du formulaire
  // Si un champ est vide ou ne correspond pas à la regex, afficher une alerte et empêcher l'envoi du formulaire
  if (
    firstName === "" ||
    lastName === "" ||
    address === "" ||
    city === "" ||
    email === ""
  ) {
    alert("Veuillez remplir tous les champs du formulaire");
    return false;
  }
  if (!regexMail.test(email)) {
    alert("Veuillez entrer une adresse email valide");
    return false;
  }
  if (!regexName.test(firstName)){
    alert("Veuillez entrer un Prénom valide");
    return false;
  }
  if (!regexName.test(lastName)) {
    alert("Veuillez entrer un Nom valide");
    return false;
  }
  if (!regexAddress.test(address)) {
    alert("Veuillez entrer une adresse postal valide");
    return false;
  }
  if (!regexCity.test(city)) {
    alert("Veuillez entrer un nom de ville valide");
    return false;
  }

  // Récupérer les id des produits du panier et les mettre dans un tableau
  const ids = getCart().map((item) => item.id);
  // Créer un objet order pour l'envoyer au serveur avec les données du formulaire et les id des produits du panier
  let order = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: ids,
  };
  sendOrder(order); // Envoyer la commande au serveur
}

// Event listener pour le bouton de validation du formulaire
function validateFormListener() {
  document.getElementById("order").addEventListener("click", (e) => {
    e.preventDefault(); // empêcher le rechargement de la page
    getAndValidateForm(); // Récupérer et valider les données du formulaire
  });
}

// ------------------------------ Envoi de la commande au serveur ----------------------------------- //
// Envoyer la commande au serveur
async function sendOrder(order) {
  try {
    // Requête POST pour envoyer la commande au serveur
    const response = await fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    const data = await response.json();

    // Enregistrer l'id de la commande dans le localStorage
    localStorage.setItem("orderId", data.orderId);

    // Rediriger vers la page de confirmation de commande
    window.location.href = "confirmation.html";
  } catch (error) {
    console.error("Error:", error);
  }
}

// Fonction pour attacher les event listeners
function attachEventListeners() {
  deleteItemListener();
  changeQuantityListener();
  totalPrice();
  totalQuantity();
  validateFormListener();
}

// ------------------------------ Appel des fonctions ----------------------------------- //
// Appel des fonctions
fetchProductInfoFromCart();