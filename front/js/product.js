// Récupérer l'ID du produit
function getId() {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  return id;
}

// Récupérer les données de l'API associées à l'ID
function fetchProductInfo(id) {
  fetch("http://localhost:3000/api/products/" + id)
  .then(response => response.json())
  .then(selectProduct => {
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

// Ajouter le produit au panier
function addToCart() {
  // Récupérer les données du produit
  const id = getId();
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;
  
  
  // Vérifier que les données sont correctes
  
  // Vérifier que la quantité est supérieure à 0
  if (quantity < 1) {
    alert("Veuillez sélectionner une quantité supérieure à 0");
    return;
  }
  if (color === "") {
    alert("Veuillez sélectionner une couleur");
    return;
  }
  
  const title = document.querySelector("#title").innerText;
  const imageUrl = document.querySelector(".item__img img").src;
  const altTxt = document.querySelector(".item__img img").alt;
  const price = document.querySelector("#price").innerText;
  
  // Créer un objet avec les données du produit
  const product = {
    id: id,
    title: title,
    imageUrl: imageUrl,
    altTxt: altTxt,
    price: price,
    color: color,
    quantity: quantity
  };
  // ajouter le produit au local storage
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart === null) {
    cart = [];
  }
  if (cart.length > 0) {
    // Vérifier si le produit est déjà dans le panier
    for (let i = 0; i < cart.length; i++) {
      const element = cart[i];
      if (element.id === product.id && element.color === product.color) {
        // Si le produit est déjà dans le panier, ajouter la quantité
        // convertir la quantité en nombre entier avec parseInt puis reconversion en string avec stringify dans le LocalStorage
        element.quantity = parseInt(element.quantity) + parseInt(product.quantity);
        localStorage.setItem("cart", JSON.stringify(cart));
        return;
      }
    }
  }
  // Ajouter le produit au panier LocalStorage
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Le produit a bien été ajouté au panier");
}

// bouton ajouter au panier
function btnCartListener() {
  const btn = document.querySelector("#addToCart");
  btn.addEventListener("click", addToCart);
}

// Appel des fonctions
var id = getId();
fetchProductInfo(id);
btnCartListener();
