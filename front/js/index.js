// Trouver la variable du tableau avec Query selector
const section = document.querySelector("#items")

// Requet sur l'api et retourner un tableau
let data = fetch("http://localhost:3000/api/products").then(response => response.json()).then(response => {

    // Boucler à l'interieur du tableau et générer l'html correspondant
    for (let i = 0; i < response.length; i++) {
        // Créer une variable pour chaque élément du tableau
        let element = response[i];

        console.log(element)

        // Ajouter l'html correspondant à chaque élément du tableau (à l'aide de la fonction innerHTML)
        section.innerHTML += `
        <a href="./product.html?id=`+element._id+`">
            <article>
              <img id="canapImg" src="`+element.imageUrl+`" alt="`+element.altTxt+`, `+element.name+`">
              <h3 class="productName">`+element.name+`</h3>
              <p class="productDescription">`+element.description+`</p>
            </article>
          </a>
        `
    }

})