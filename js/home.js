//   ! Start Add Product Page 





let productsContainer = [];


if(localStorage.getItem("allProducts") != null){
    productsContainer = JSON.parse(localStorage.getItem("allProducts"))
    displayProducts()
}









function displayProducts(){
    let productsRows = ``

    for (let i = 0; i <  productsContainer.length; i++) {


        productsRows += `
        
            <div class="card">
                
             <img src="${productsContainer[i].image}" alt="Avatar" style="width:100%"> 
             <h4><b>${productsContainer[i].name}</b></h4>
             <p>${productsContainer[i].category}</p>
             
              
            </div>
        `
        
    }
    document.getElementById("card-wrapper").innerHTML = productsRows
}

