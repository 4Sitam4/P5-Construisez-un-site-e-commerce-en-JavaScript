// Fonction pour afficher l'ID de la commande sur la page de confirmation
function getOrderID() {
  const orderId = localStorage.getItem("orderId");
  displayOrderId(orderId);
}
// Fonction pour afficher l'ID de la commande sur la page de confirmation
function displayOrderId(orderId) {
  const orderIdElement = document.getElementById("orderId");
  orderIdElement.innerText = orderId;
  deleteLocalStorage();
}
// Fonction pour supprimer le localStorage après l'affichage de l'ID de la commande
function deleteLocalStorage() {
  localStorage.clear();
}
// Appel de la fonction initiale
getOrderID();
