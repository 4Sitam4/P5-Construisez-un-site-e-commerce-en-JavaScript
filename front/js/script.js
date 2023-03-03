// Récupérer la balise HTML du fichier index.html
// Balise HTML section avec l'id items
const section = document.querySelector('#items');

// Requet sur l'api pour récupérer les données
fetch("http://localhost:3000/api/products")
.then(reponse => reponse.json())
.then(data => displayCanaps(data));

// Créer une boucle pour afficher les données
function displayCanaps (canaps){
    for (let index = 0; index < canaps.length; index++) {
        const {_id, name, description, imageUrl, altText} = canaps[index]


        //Création de lien
        const link = document.createElement("a")
        link.href = "./product.html?id=" + _id 

        //Création de l'article
        const article = document.createElement("article");

        //Création de la balise img
        const img = document.createElement("img")
        img.src = imageUrl
        img.alt = altText
        article.appendChild(img)

        //Création du nom de l'article
        const h3 = document.createElement("h3")
        h3.className = "productName"
        h3.innerText = name
        article.appendChild(h3)

        //Création du nom de l'article
        const p = document.createElement("p")
        p.className = "productDescription"
        p.innerText = description
        article.appendChild(p)

        link.appendChild(article)
        section.appendChild(link)
        
    }
}

/* <a href="./product.html?id=42">
            <article>
              <img src="../../back/images/kanap01.jpeg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> */

          