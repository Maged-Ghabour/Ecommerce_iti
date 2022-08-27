//   ! Start Add Product Page 

let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategoryInput = document.getElementById("productCategory");
let productImageInput = document.getElementById("productImage");
let productDescInput = document.getElementById("productDesc");
let btnAddProduct = document.getElementById("btnAddProduct");

let productsContainer = [];


if(localStorage.getItem("allProducts") != null){
    productsContainer = JSON.parse(localStorage.getItem("allProducts"))
    displayProducts()
}

btnAddProduct.addEventListener("click" , (e)=>{
    e.preventDefault()
    let product = {
        name : productNameInput.value,
        price : productPriceInput.value,
        category:productCategoryInput.value,
        image :productImageInput.value,
        desc : productDescInput.value

    }
    productsContainer.push(product)

    localStorage.setItem("allProducts" , JSON.stringify(productsContainer))

    displayProducts()

    // clearForm()

    console.log(productsContainer);
})


function clearForm(){
    productNameInput.value =""
    productPriceInput.value =""
    productCategoryInput.value =""
    productImageInput.value =""
    productDescInput.value =""  
}



function displayProducts(){
    let productsRows = ``

    for (let i = 0; i <  productsContainer.length; i++) {
        
        productsRows += `
        
            <tr>
                
                <td>${i}</td>
                <td>${productsContainer[i].name}</td>
                <td>${productsContainer[i].price}</td>
                <td>${productsContainer[i].category}</td>
                <td>${productsContainer[i].image}</td>
                <td>${productsContainer[i].desc}</td>
                <td><button class='btn-update'>update</button></td>
                <td><button class='btn-delete'>delete</button></td>
            
            
            </tr>
        `
        
    }
    document.getElementById("productsWrapper").innerHTML = productsRows
}




// ! End Add Product Page  