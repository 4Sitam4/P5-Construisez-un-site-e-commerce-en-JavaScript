// Récupérer la balise HTML du fichier index.html
// Balise HTML section avec l'id items
function fetchProducts() {
  // Requet sur l'api pour récupérer les données
  fetch("http://localhost:3000/api/products")
    .then((reponse) => reponse.json())
    .then((data) => displayCanaps(data));
}

// Créer une boucle pour afficher les données
function displayCanaps(canaps) {
  const section = document.querySelector("#items");
  for (let index = 0; index < canaps.length; index++) {
    // Boucle pour afficher les produits
    const { _id, name, description, imageUrl, altText } = canaps[index];

    //Création de lien
    const link = document.createElement("a");
    link.href = "./product.html?id=" + _id;

    //Création de l'article
    const article = document.createElement("article");

    //Création de la balise img
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = altText;
    article.appendChild(img);

    //Création du nom de l'article
    const h3 = document.createElement("h3");
    h3.className = "productName";
    h3.innerText = name;
    article.appendChild(h3);

    //Création du nom de l'article
    const p = document.createElement("p");
    p.className = "productDescription";
    p.innerText = description;
    article.appendChild(p);

    link.appendChild(article);
    section.appendChild(link);
  }
}

fetchProducts();
