//   ! Start Add Product Page 

let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategories = document.getElementById("productCategories");
let productImageInput = document.getElementById("productImage");
let productDescInput = document.getElementById("productDesc");
let btnAddProduct = document.getElementById("btnAddProduct");


let productsContainer = [];
if(localStorage.getItem("allProducts") != null){
    productsContainer = JSON.parse(localStorage.getItem("allProducts"))
    displayProducts()
}


// ! Add Product
function addProduct(){

    // ! Start Validation 
    if(validateForm() == true){
   
    // ! End Validation 
        
        let product = {
            id   : new Date().valueOf(),
            name : productNameInput.value,
            price : productPriceInput.value,
            category:productCategories.value,
            image :productImageInput.value,
            desc : productDescInput.value
    
        }
            productsContainer.push(product) 
            localStorage.setItem("allProducts" , JSON.stringify(productsContainer))
            displayProducts()
            clearForm()
            alertSuccess()
    }   
}



btnAddProduct.addEventListener("click" , function addProduct(e) {

    e.preventDefault()


})



// ! Show All Categories in Select input

function showCats(){
   
    let allCategories = JSON.parse(localStorage.getItem("allCategories"));
    

    for (let index = 0; index < allCategories.length; index++) {
        productCategories.innerHTML += `
        <option value="${allCategories[index].name}">${allCategories[index].name}</option>
         ` 
    }
}

showCats()

// ! Clear All Inputs 
function clearForm(){
    productNameInput.value =""
    productPriceInput.value =""
    productCategories.value =""
    productImageInput.value =""
    productDescInput.value =""  
}

// ! Show All Products in Table 
function displayProducts(){
 
    let productsRows = ``

    for (let i = 0; i <  productsContainer.length; i++) {

      
  
    // productImageInput.addEventListener("change" , function(){

    //       ! Store Image in Local Storage 
    
    //     const reader = new FileReader();
    //     reader.addEventListener("load" , function(){
         
        
    //         productsContainer[i].image =  reader.result

    //         console.log(productsContainer[i].image);
           

            
    //     })
    //      reader.readAsDataURL(this.files[0]);
    // }); 

        productsRows += `
            <tr>
                <td>${i}</td>
                <td>${productsContainer[i].name}</td>
                <td>${productsContainer[i].price}</td>
                <td>${productsContainer[i].category}</td>
                <td><img src="${productsContainer[i].image.replace("C:\\fakepath\\" , "imgs/")}" alt="Avatar" style="width:100% ;border-radius:5% 5% 0 0">
                <td>${productsContainer[i].desc}</td></td>
                <td><button class='btn-update' onclick='retrive(${i})'><i class="fa-solid fa-pen-to-square fa-xl"></i><button class='btn-delete' onclick='deleteProduct(${i})'><i class="fa-solid fa-trash fa-xl"></i></button></button></td>
            
            </tr>
        `
        
    }
    document.getElementById("productsWrapper").innerHTML = productsRows
   
}



// ! Delete Product 
function deleteProduct(index){

    productsContainer.splice(index,1);
    displayProducts();
  
    alertDelete()
    
    localStorage.setItem("allProducts" , JSON.stringify(productsContainer))
}

//  ! Update Product 
var toggole = false; 
var globalindex = 0;
function init ()
{
    if (!toggole)
        {
            addProduct();
            displayProducts();
        }
    else 
        {
            updatefun(); 
            btnAddProduct.innerHTML="Add Product"
        }
    
    toggole = false; 
}

function retrive(id)
{
    productNameInput.value = productsContainer[id].name; 
    productPriceInput.value = productsContainer[id].price; 
    productCategories.value = productsContainer[id].category; 
    productDescInput.value = productsContainer[id].desc;
    toggole = true; 
    globalindex = id; 
    btnAddProduct.innerHTML="Update Product";
     window.scrollTo({
        top: 200,
        behavior: 'smooth',
      });
}

function updatefun()
{
    productsContainer[globalindex].name = productNameInput.value; 
    productsContainer[globalindex].price = productPriceInput.value;
    productsContainer[globalindex].category = productCategories.value; 
    productsContainer[globalindex].desc = productDescInput.value;
    localStorage.setItem("allProducts" , JSON.stringify(productsContainer));
    displayProducts(); 
    clearForm();
    alertUpdate()
}


let search_bar = document.getElementById("search");
search_bar.onkeyup = function()
{
    var cols = "";
    for (var i=0;i<productsContainer.length;i+=1)
       {
            if (productsContainer[i].name.toLowerCase().includes(search_bar.value.toLowerCase()))
            {
                cols+=`
                <tr>
                    <td>${i}</td>
                    <td>${productsContainer[i].name}</td>
                    <td>${productsContainer[i].price}</td>
                    <td>${productsContainer[i].category}</td>
                    <td><img  width="100%" height="100%"  src="${productsContainer[i].image.replace("C:\\fakepath\\" , "imgs/")}"></td>
                    <td>${productsContainer[i].desc}</td>
                    <td>
                        <button class="btn-update" id="btn-delete" onclick="retrive(${i})">Edit</button>
                        <button class='btn-delete' onclick='deletefun(${i})'>delete</button>
                    </td>
                </tr>`
            }
       }
    document.getElementById("productsWrapper").innerHTML=cols;
}

// ! Validation inputs (productName , ProductPrice , ... etc)

function validateForm() {

  
    let charsOnly = /^[a-z A-Z\u0621-\u064A0]*$/; // Alow To write Arabic Letters
    let numbersOnly = /^\d+$/; 
    let imageOnly = /(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i;

    if (productNameInput.value == "" || !productNameInput.value.match(charsOnly)) {
        document.querySelector(".validateProductName").style.display = "block"
        productNameInput.focus() ;
        return false;
    }else{
        document.querySelector(".validateProductName").style.display = "none"
    }
  

    if ((productPriceInput.value == "" )) {
        document.querySelector(".validateProductPrice").style.display = "block"
        productPriceInput.focus() ;
        return false;
    }else{
        document.querySelector(".validateProductPrice").style.display = "none"
    }
    if ((productCategories.value == "" || productCategories.value == "Select Category")) {
        document.querySelector(".validateProductCats").style.display = "block"
        productCategories.focus() ;
        return false;
    }else{
        document.querySelector(".validateProductCats").style.display = "none"
    }if ((!productImageInput.value.match(imageOnly) )) {
        document.querySelector(".validateProductImg").style.display = "block"
        validateProductImg.focus() ;
        return false;
    }else{
        document.querySelector(".validateProductImg").style.display = "none"
    }

    if ((productDescInput.value == "" )) {
        document.querySelector(".validateProductDesc").style.display = "block"
        productDescInput.focus() ;
        return false;
    }else{
        document.querySelector(".validateProductDesc").style.display = "none"
    }
    
    

    return true;
 }



 // ! Alert Messages When Added,Updated or Deleted Products


 let alertSuccess= ()=>{
    document.getElementById("PopupSuccess").style.opacity = 1
    setTimeout(() => {
        document.getElementById("PopupSuccess").style.opacity = 0
    }, 1000);
 }


 
 let alertDelete= ()=>{
    window.scrollTo({
        top: 200,
        behavior: 'smooth',
      });
    document.getElementById("PopupDelete").style.opacity = 1
    setTimeout(() => {
        document.getElementById("PopupDelete").style.opacity = 0
    }, 1000);
 }

  
 let alertUpdate= ()=>{
    window.scrollTo({
        top: 200,
        behavior: 'smooth',
      });
    document.getElementById("PopupUpdate").style.opacity = 1
    setTimeout(() => {
        document.getElementById("PopupUpdate").style.opacity = 0
    }, 1000);
 }


 
// ! Authorization 
let adminEmail = getCookie("email");
let adminPassword = getCookie("password");

    if(adminEmail !== "iti@yahoo.com" && adminPassword !== "Iti01234" ){
        location.href = "login.html"      
    }
// ! End Authorization




// ! Start distroy Section
document.getElementById("logout").addEventListener("click" ,()=>{
    location.href = "login.html"
    deleteAllCookies();
})
// ! End distroy Section
