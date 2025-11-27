let TableauProduit = [];
let lastId =0;
let mood = "create";
let tmp;
let submit = document.getElementById("submitBtn");

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
      if(mood == "create"){
      resetForm()
      TableauProduit.push(produit);
      }else{
            TableauProduit[tmp] = produit;
            resetForm()
            mood ="create";
            submit.innerHTML="Ajouter"
      }
      renderCardProduit(TableauProduit);
      console.log(TableauProduit);
});


function resetForm(){
      document.forms["AjoutProduit"].nomProduit.value = "";
      document.forms["AjoutProduit"].prixProduit.value = "";
      document.forms["AjoutProduit"].stockProduit.value = "";
}

function renderCardProduit(TableauProduit){
      document.getElementById("containerProduit").innerHTML = renderListPruits(TableauProduit);

      document.querySelectorAll(".delateBtn").forEach(btn =>{
            btn.addEventListener("click", ()=>{
                  let idProduitBtn= btn.getAttribute("data-id");
                  delateProduitById(TableauProduit, idProduitBtn);
            })
      document.querySelectorAll(".updateBtn").forEach(btn =>{
            btn.addEventListener("click", ()=>{
                  // document.forms["updateProduit"].classList.remove("d-none");
                  // document.forms["updateProduit"].classList.add("d-block");
                  // document.forms["AjoutProduit"].classList.add("d-none");
                  let idProduitBtnToUpdate= btn.getAttribute("data-id");
                  updateProductById(TableauProduit, idProduitBtnToUpdate);
            })
      })
})
}
function updateProductById(TableauProduit, id){
      let updatedProduct = TableauProduit.find(produit => produit.id == id);
      tmp = TableauProduit.findIndex(produit => produit.id == id);
      console.log(tmp);
      let form = document.forms["AjoutProduit"];
      form.nomProduit.value = updatedProduct.nom;
      form.prixProduit.value = updatedProduct.prix
      form.stockProduit.value = updatedProduct.stock;
      submit.innerHTML="Update";
      mood = "update";
      console.log(form.nomProduit.value);
      console.log(form.prixProduit.value);

      console.log(form.stockProduit.value);

      // document.forms["updateProduit"].addEventListener("submit", (event)=>{
      //       // event.preventDefault();
      //       let form = event.target;
      //       console.log(form.nomProduit);
      //       form.nomProduit.value = updatedProduct.nom
      //       form.prixProduit.value = updatedProduct.prix
      //       form.stockProduit.value = updatedProduct.stock;
      // })
      // console.log(form);


}

function delateProduitById(TableauProduit, id){
      let delatedProduct = TableauProduit.findIndex(produit => produit.id == id);
      TableauProduit.splice(delatedProduct, 1);
      renderCardProduit(TableauProduit);

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
                  <td type="button" data-id="${produit.id}" class="bg-primary updateBtn">Modifier</td>
                  <td type="button" data-id="${produit.id}" class="bg-danger delateBtn">Supprimer</td>
            </tr>`
}






