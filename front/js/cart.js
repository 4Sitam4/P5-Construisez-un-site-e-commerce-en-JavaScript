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
}

// ------------------------------ --- ----------------------------------- //

// Appel des fonctions
let cartData = getCart();
fetchProductInfoFromCart(cartData);