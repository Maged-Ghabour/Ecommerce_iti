

// ! Authorization 
/*   Authorization Page */
let adminEmail = getCookie("email");
let adminPassword = getCookie("password");

    if(adminEmail !== "iti@yahoo.com" && adminPassword !== "Iti01234" ){
        location.href = "login.html"      
    }
/*   Authorization Page */
      

// ! End Authorization


//   ! Start Add Product Page 

let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategories = document.getElementById("productCategories");let productImageInput = document.getElementById("productImage");
let productDescInput = document.getElementById("productDesc");
let btnAddProduct = document.getElementById("btnAddProduct");

let search_bar = document.getElementById("search");

var toggole = false; 
var globalindex = 0;






let productsContainer = [];


if(localStorage.getItem("allProducts") != null){
    productsContainer = JSON.parse(localStorage.getItem("allProducts"))
    displayProducts()
}





function init ()
{
    if (!toggole)
        {
            add();
            displayProducts();
        }
    else 
        {
            updatefun(); 
            btnAddProduct.innerHTML="Add Product"
        }
    
    toggole = false; 
    clearForm();
}



search_bar.onkeyup = function()
{
    var cols = "";
    for (var i=0;i<productsContainer.length;i+=1)
       {
            if (productsContainer[i].name.includes(search_bar.value.toLowerCase()) || productsContainer[i].category.includes(search_bar.value.toLowerCase()))
            {
                cols+=`
                <tr>
                    <td>${i}</td>
                    <td>${productsContainer[i].name}</td>
                    <td>${productsContainer[i].price}</td>
                    <td>${productsContainer[i].category}</td>
                    <td><img  width="100%" height="100%"  src="${productsContainer[i].image}"></td>                    <td>${productsContainer[i].description}</td>
                    <td>
                        <button class="btn-update" id="btn-delete" onclick="retrive(${i})">Edit</button>
                        <button class='btn-delete' onclick='deletefun(${i})'>delete</button>
                    </td>
                </tr>`
            }
       }
    document.getElementById("productsWrapper").innerHTML=cols;
}



















btnAddProduct.addEventListener("click" , (e)=>{

    e.preventDefault()








    let product = {
        name : productNameInput.value,
        price : productPriceInput.value,
        category:productCategories.value,
        // image :productImageInput.value,
        desc : productDescInput.value

    }



    
    productsContainer.push(product)

    localStorage.setItem("allProducts" , JSON.stringify(productsContainer))

    displayProducts()
    showCats()

    clearForm()

 
})



function showCats(){

   
    console.log(productCategories);

    let allCategories = JSON.parse(localStorage.getItem("allCategories"));
    

    for (let index = 0; index < allCategories.length; index++) {
        productCategories.innerHTML += `
        <option value="${allCategories[index].name}">${allCategories[index].name}</option>
         ` 
    }

   
}

showCats()



function clearForm(){
    productNameInput.value =""
    productPriceInput.value =""
    productCategories.value =""
    productImageInput.value =""
    productDescInput.value =""  
}



function displayProducts(){
    let productsRows = ``

    for (let i = 0; i <  productsContainer.length; i++) {



    productImageInput.addEventListener("change" , function(){
       
    
        const reader = new FileReader();
        reader.addEventListener("load" , function(){
         
        
            productsContainer[i].image =  reader.result
        })
         reader.readAsDataURL(this.files[0]);
    });

    

        productsRows += `
        
            <tr>
                
                <td>${i}</td>
                <td>${productsContainer[i].name}</td>
                <td>${productsContainer[i].price}</td>
                <td>${productsContainer[i].category}</td>
                <td><img  width="100%" height="100%"  src="${productsContainer[i].image}"></td>
                <td>${productsContainer[i].desc}</td>
                <td><button class='btn-update' onclick=''><i class="fa-solid fa-pen-to-square fa-xl"></i><button class='btn-delete' onclick='deleteProduct(${i})'><i class="fa-solid fa-trash fa-xl"></i></button></button></td>
              
            
            
            </tr>
        `
        
    }
    document.getElementById("productsWrapper").innerHTML = productsRows
}


function deleteProduct(index){

    productsContainer.splice(index,1);
    displayProducts();
    localStorage.setItem("allProducts" , JSON.stringify(productsContainer))
}



function retrive(id)
{
    productImageInput.value = productsContainer[id].name; 
    productPriceInput.value = productsContainer[id].price; 
    productCategories.value = productsContainer[id].category; 
    productDescInput.value = productsContainer[id].description;
    
    
    
    toggole = true; 
    globalindex = id; 


    btnAddProduct.innerHTML="Update Product";
}

function updatefun()
{
    productsContainer[globalindex].name = productImageInput.value; 
    productsContainer[globalindex].price = productPriceInput.value;
    productsContainer[globalindex].category = productCategories.value; 
    productsContainer[globalindex].description = productDescInput.value;
    localStorage.setItem("productsContainer" , JSON.stringify(productsContainer));
    displayProducts(); 
}



// ! End Add Product Page  








