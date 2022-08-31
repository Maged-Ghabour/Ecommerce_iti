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
        
            <div class="cards">
                
             <img src="${productsContainer[i].image.replace("C:\\fakepath\\" , "imgs/")}" alt="Avatar" style="width:100% ;border-radius:5% 5% 0 0"> 
             <h4>${productsContainer[i].name}</h4>
             <p>${productsContainer[i].category}</p>
             <small> ${productsContainer[i].price} $</small>
             <input type="button" value="Add To Card">
             
             
              
            </div>
        `
        
    }
    document.getElementById("product").innerHTML = productsRows
}


//  ! Start Show Categories 



function displayCats(){
   
    let cats = JSON.parse(localStorage.getItem("allCategories"));
    let catsRows = ``

    for (let i = 0; i <  cats.length; i++) {

        catsRows += `
        
                
                <li><a href="" >${cats[i].name}</li>
           
        `
        
    }
    document.getElementById("cats").innerHTML = catsRows
}



displayCats()
//  ! End Show Categories