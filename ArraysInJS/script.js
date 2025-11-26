let TableauProduit = [];
let lastId =0;
function generateId(){
      if(TableauProduit.length == 0) return 1;
      return TableauProduit[TableauProduit.length -1].id +1;
}

document.forms["AjoutProduit"].addEventListener("submit", (event)=>{
      event.preventDefault();
      let form = event.target;
      let id = generateId();
      let produit = {
            id: id,
            nom: form.nomProduit.value,
            prix: form.prixProduit.value,
            stock: form.stockProduit.value
      }
      TableauProduit.push(produit);
      renderCardProduit(TableauProduit);
      console.log(TableauProduit);
})

function renderCardProduit(TableauProduit){
      document.getElementById("containerProduit").innerHTML = renderListPruits(TableauProduit);
}
function renderListPruits(TableauProduit){
      let cardProduit = "";
      TableauProduit.map(produit =>{
            cardProduit += renderProduit(produit);
      })
      return cardProduit;
}
function renderProduit(produit){
      return `<tr>
                  <td>${produit.id}</td>
                  <td>${produit.nom}</td>
                  <td>${produit.prix}</td>
                  <td>${produit.stock}</td>
                  <td type="button" class="bg-primary">Modifier</td>
                  <td type="button" class="bg-danger">Supprimer</td>
            </tr>`
}

