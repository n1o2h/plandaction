let TableauProduit = [
      {
      id: 1,
      nom: "babane",
      prix: 23,
      stock: 18
      },
      {
      id: 2,
      nom: "Appel",
      prix: 73,
      stock: 80
      },
      {
      id: 3,
      nom: "babane",
      prix: 23,
      stock: 20
      }
];
let lastId =0;
let mood = "create";
let tmp;
let submit = document.getElementById("submitBtn");

function generateId(){
      if(TableauProduit.length == 0) return 1;
      return TableauProduit[TableauProduit.length -1].id +1;
}

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

function searchProduct(){
document.forms["searchProduct"].addEventListener("input", (event) =>{
      event.preventDefault();
      let searched = event.target.value.trim().toLowerCase();
      let filtredProduct = TableauProduit.filter(produit => produit.nom.trim().toLowerCase().includes(searched));
      if(filtredProduct.length == 0 || TableauProduit.length == 0){
            console.log("aucun produit n'extst avec ce nom");
      }
      renderCardProduit(filtredProduct);
})
}

function initApp(){
      
      if(TableauProduit.length != 0){
            renderCardProduit(TableauProduit);
      }
      document.forms["AjoutProduit"].addEventListener("submit", (event)=>{
      event.preventDefault();
      let form = event.target;
            let produit = {
                  nom: form.nomProduit.value,
                  prix: form.prixProduit.value,
                  stock: form.stockProduit.value
            }
      if(mood == "create"){
            let id = generateId();
            produit.id = id;
            resetForm()
            TableauProduit.push(produit);
      }else{
            TableauProduit[tmp] = produit;
            produit.id = tmp + 1;
            resetForm()
            mood ="create";
            submit.innerHTML="Ajouter"
      }
      renderCardProduit(TableauProduit);
      });
      searchProduct();



      document.getElementById("prixSort").addEventListener("click", ()=> {
            document.getElementById("typeOfSort").innerHTML = `Les produits tries par prix croissant`;
            let ProductSortByPrice = TableauProduit.sort((a, b) => a.prix-b.prix);
            renderCardProduit(ProductSortByPrice);
      });

      document.getElementById("qauntiteSort").addEventListener("click", ()=> {
            document.getElementById("typeOfSort").innerHTML = `Les produits tries par quantite croissant`;

            let ProductSortByQuantite = TableauProduit.sort((a, b) => b.stock-a.stock);
            renderCardProduit(ProductSortByQuantite);
      });
      document.getElementById("noSort").addEventListener("click", ()=> {
            document.getElementById("typeOfSort").innerHTML = ``;
            let ProductSortBy=Id = TableauProduit.sort((a, b) => a.id-b.id);
            renderCardProduit(ProductSortBy);
      }
);
}
initApp();


