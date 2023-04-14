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

function displayCart(cartData) {
    const section = document.querySelector('#cart__items');
    const article = document.createElement('article');

    // Ajouter les données du produit dans l'article
    article.className = 'cart__item';
    article.dataset.id = cartData.id;
    article.dataset.color = cartData.color;

    // Créer la 1ere balise div enfant de article
    const div = document.createElement('div');
    div.className = 'cart__item__img';
    article.appendChild(div);

    // Créer la balise img enfant de div
    const img = document.createElement('img');
    img.src = cartData.imageUrl;
    img.alt = cartData.altTxt;
    div.appendChild(img);

    // Créer la balise 2eme div enfant de article
    const div2 = document.createElement('div');
    div2.className = 'cart__item__content';
    article.appendChild(div2);

    
}

// Appel des fonctions
let cartData = getCart();
displayCart(cartData);