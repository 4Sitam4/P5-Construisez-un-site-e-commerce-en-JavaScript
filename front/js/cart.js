// Récupérer les données du panier
function getCart() {
    let cart = localStorage.getItem('cart');
    if (cart === null) {
        return cart = [];
    } 
    else {
        return JSON.parse(cart);
    }
}

// Récupérer les données complètes des produits dans le panier
function fetchProductInfoFromCart() {
    // Récupérer l'id des produits dans le panier
    let cart = getCart();
    // boulce pour récupérer les données des produits
    if (cart.length === 0) {
        alert('Votre panier est vide');
    }
    if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            let id = cart[i].id;
            // Requete sur l'api pour récupérer les données
            fetch("http://localhost:3000/api/products/" + id)
                .then(reponse => reponse.json())
                .then(data =>
                     data = {
                        id: id,
                        title: data.name,
                        price: data.price,
                        quantity: cart[i].quantity,
                        color: cart[i].color,
                        imageUrl: data.imageUrl,
                        altTxt: data.altTxt
                    }
                ).then(product => displayCart(product))};
        }
    }


// ------------------------------ displayCart ----------------------------------- //
// Afficher les données des produits dans le panier
function displayCart(cartData) {
    // Création de l'élément article
    const article = document.createElement('article');
    article.classList.add('cart__item');
    article.setAttribute('data-id', cartData.id);
    article.setAttribute('data-color', cartData.color);

    // Création de la div pour l'image
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('cart__item__img');

    // Création de l'image
    const img = document.createElement('img');
    img.src = cartData.imageUrl;
    img.alt = cartData.altTxt;

    // Ajout de l'image à la div d'image
    imgDiv.appendChild(img);

    // Création de la div pour le contenu
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('cart__item__content');

    // Création de la div pour la description
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('cart__item__content__description');

    // Création du titre h2
    const title = document.createElement('h2');
    title.textContent = cartData.title;

    // Création du paragraphe pour la couleur
    const color = document.createElement('p');
    color.textContent = cartData.color;

    // Création du paragraphe pour le prix
    const price = document.createElement('p');
    price.textContent = cartData.price + ' €';

    // Création de la div pour les settings
    const settingsDiv = document.createElement('div');
    settingsDiv.classList.add('cart__item__content__settings');

    // Création de la div pour la quantité
    const quantityDiv = document.createElement('div');
    quantityDiv.classList.add('cart__item__content__settings__quantity');

    // Création du paragraph pour la quantité
    const quantity = document.createElement('p');
    quantity.textContent = 'Qté : ';

    // Création de l'input pour la quantité
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.name = 'itemQuantity';
    quantityInput.min = '1';
    quantityInput.max = '100';
    quantityInput.value = cartData.quantity;
    quantityInput.classList.add('itemQuantity');

    // Création de la div pour le bouton de suppression
    const deleteDiv = document.createElement('div');
    deleteDiv.classList.add('cart__item__content__settings__delete');

    // Création du bouton de suppression
    const deleteBtn = document.createElement('p');
    deleteBtn.classList.add('deleteItem');
    deleteBtn.textContent = 'Supprimer';


    // Ajout des éléments de description à la div de description
    descriptionDiv.appendChild(title);
    descriptionDiv.appendChild(color);
    descriptionDiv.appendChild(price);

    // Ajout de la div de description à la div de contenu
    contentDiv.appendChild(descriptionDiv);

    // Ajout de la div de settings à la div de contenu
    contentDiv.appendChild(settingsDiv);

    // Ajout de la div de quantité à la div de settings
    settingsDiv.appendChild(quantityDiv);

    // Ajout de la div de suppression à la div de settings
    settingsDiv.appendChild(deleteDiv);

    // Ajout du paragraphe de quantité à la div de quantité
    quantityDiv.appendChild(quantity);

    // Ajout de l'input de quantité à la div de quantité
    quantityDiv.appendChild(quantityInput);

    // Ajout du bouton de suppression à la div de suppression
    deleteDiv.appendChild(deleteBtn);
    

    // Ajout de la div d'image et de la div de contenu à l'article
    article.appendChild(imgDiv);
    article.appendChild(contentDiv);

    // Ajout de l'article à la section avec l'ID 'cart__items'
    document.getElementById('cart__items').appendChild(article);

    // Ajout d'un écouteur d'événement pour le bouton de suppression
    deleteItemListener();
    // Ajout d'un écouteur d'événement pour l'input de quantité
    changeQuantityListener();
    // Calcul du prix total et affichage
    totalPrice();
    // Calcul et affichage du nombre d'articles dans le panier
    totalQuantity();
}
// ------------------------------ --- ----------------------------------- //

// ------------------------------ deleteItem ----------------------------------- //
// Supprimer un produit du panier
function deleteItem() {
    // Récupérer l'id du produit
    let id = this.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id');
    // Récupérer la couleur du produit
    let color = this.parentNode.parentNode.parentNode.parentNode.getAttribute('data-color');
    // Récupérer les données du panier
    let cart = getCart();
    // Boucle pour trouver le produit à supprimer
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id && cart[i].color === color) {
            cart.splice(i, 1);
        }
    }
    // Mettre à jour le panier
    localStorage.setItem('cart', JSON.stringify(cart));
    // display none du produit supprimé (pour éviter un rechargement de la page)
    this.parentNode.parentNode.parentNode.parentNode.style.display = 'none';

    // appel updateCart pour mettre à jour le panier
    updateCart();

}
// ------------------------------ --- ----------------------------------- //
// Event listener pour le bouton de suppression
function deleteItemListener() {
    let deleteBtn = document.getElementsByClassName('deleteItem');
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', deleteItem);
    }
}

// ------------------------------ modifier la qty  ----------------------------------- //
// Modifier la quantité d'un produit
function changeQuantity() {
    // Récupérer l'id du produit
    let id = this.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id');
    // Récupérer la couleur du produit
    let color = this.parentNode.parentNode.parentNode.parentNode.getAttribute('data-color');
    // Récupérer les données du panier
    let cart = getCart();
    // Boucle pour trouver le produit à modifier
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id && cart[i].color === color) {
            cart[i].quantity = this.value;
        }
    }
    // Mettre à jour le panier du localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    // appel updateCart pour mettre à jour le panier
    updateCart();
}

// Event listener pour l'input de quantité
function changeQuantityListener() {
    let quantityInput = document.getElementsByClassName('itemQuantity');
    for (let i = 0; i < quantityInput.length; i++) {
        quantityInput[i].addEventListener('change', changeQuantity);
    }
}

// ------------------------------ --- ----------------------------------- //

// ------------------------------ totalPrice ----------------------------------- //
// Calculer le prix total du panier puis appel la fonction displayTotalPrice pour afficher le prix total
function totalPrice() {
    // Récupérer les données du panier
    let cart = getCart();
    // Initialiser le prix total
    let total = 0;
    // Boucle pour calculer le prix total
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }
    // Afficher le prix total
    displayTotalPrice(total);
}
function displayTotalPrice(total) {
    // Afficher le prix total
    document.getElementById('totalPrice').textContent = total;
}
// ------------------------------ --- ----------------------------------- //

// ------------------------------ Total des produits dans le panier ----------------------------------- //
// Calculer le nombre total de produits dans le panier et l'afficher
function totalQuantity() {
    // Récupérer les données du panier
    let cart = getCart();
    // Initialiser le nombre total de produits
    let total = 0;
    // Boucle pour calculer le nombre total de produits
    for (let i = 0; i < cart.length; i++) {
        total += parseInt(cart[i].quantity);
    }

    // Afficher le nombre total de produits
    document.getElementById('totalQuantity').textContent = total;
}

// Function pour mettre à jour tous le visuel du panier (prix total, nombre de produits, etc...)
function updateCart() {
    // Mettre à jour le prix total
    totalPrice();
    // Mettre à jour le nombre d'articles dans le panier
    totalQuantity();
}


// Appel des fonctions
let cartData = getCart();
fetchProductInfoFromCart(cartData);