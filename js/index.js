
let productsContainer = [];

// ! retrive Cart from localStorage 
let basket = JSON.parse(localStorage.getItem("cartData")) || []

if(localStorage.getItem("allProducts") != null){
    productsContainer = JSON.parse(localStorage.getItem("allProducts"))
    displayProducts()
}
let cats = JSON.parse(localStorage.getItem("allCategories"));

function displayProducts(){
    let productsRows = ``
    for (let i = 0; i <  productsContainer.length; i++) {

        let id = productsContainer[i].id

        let search = basket.find((x)=> x.id === id) || []
        
        productsRows += `        
            <div class="cards ${productsContainer[i].category}" id="product-id-${productsContainer[i].id}">
                
            <img src="${productsContainer[i].image.replace("C:\\fakepath\\" , "imgs/")}" width="100%" min-height="270px"> 

            <div class="content">

      
                <h3>${productsContainer[i].name}</h3>
                
                  <p>${productsContainer[i].category}</p>
                  <small> ${productsContainer[i].price} $</small>
           
                <p>${productsContainer[i].desc}</p>
              
                
             
                        
                        <button class="addToCart" id="addToCart" onclick="increment(${id})">Add To Cart 
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span id="${id}" onclick="output()" class="quantity"
                        
                         ${search.item === undefined ? 0 : search.item}
                         </span>
                        </button>
                        
               
              


            </div>


              
            </div>
        `
        
    }
    document.getElementById("product").innerHTML = productsRows
}


/**
 * 
 * <span onclick="increment(${id})"> <i class="fa-solid fa-plus"></i> </span>
 *  <span id="${id}" onclick="output()" class="quantity"> ${search.item === undefined ? 0 : search.item} </span>
 * <span onclick="decrement(${id})"><i class="fa-solid fa-minus"></i></span>
            <button class="addToCart" id="addToCart">Add To Cart</button>
            <button class="removeFromCart" id="removeFromCart">Remove</button>
             
 * 
 */

//  ! Start Show Categories 



function displayCats(){
   
    let cats = JSON.parse(localStorage.getItem("allCategories"));

    if(localStorage.getItem("allCategories")){
        let catsRows = ``
        for (let i = 0; i <  cats.length; i++) {
            catsRows += `<li class="cat" data-cat=".${cats[i].name}">${cats[i].name}</li>`
        }
        document.getElementById("cats").innerHTML = catsRows
    }
 
}

displayCats()
//  ! End Show Categories




// Start Filtering The Products Categroy
let allCats = document.querySelectorAll('#cats li')
let productsCategory = Array.from(document.querySelectorAll('.cards'))


// Start get the Li for any Cat
allCats.forEach((li) => {
    li.addEventListener('click', showRelated)
})

function showRelated()
{
    productsCategory.forEach((ele) => {
        ele.style.display = 'none'
    })
    document.querySelectorAll(this.dataset.cat).forEach((ele) => {
        ele.style.display = 'block'
        console.log(this.dataset.cat)
    })
}












/**
 *  ! Start Add To Cart 
 **/






 let increment = (id)=>{
    
        
    let search = basket.find((x)=> x.id === id)


    if(search == undefined){
        basket.push({
            id : id,
            item : 1
        });
    }else{
     search.item += 1
    }

    output(id);
    
    localStorage.setItem("cartData" , JSON.stringify(basket))
  
    
    }
    let decrement = (id)=>{
        localStorage.setItem("cartData" , JSON.stringify(basket))
        let search = basket.find((x)=> x.id === id)

        if(search === undefined) return
        else if (search.item === 0) return
        else{
            search.item -= 1
        }
      
       
       output(id)
       basket =  basket.filter((x)=> x.item !== 0);

        
        localStorage.setItem("cartData" , JSON.stringify(basket))
        console.log(basket);

    }

    let output = (id)=>{
        let search = basket.find((x)=>x.id === id);
            
        document.getElementById(id).innerHTML = search.item

        calc()
    }


    let calc = ()=>{

        let cartAmount = document.getElementById("cart-amount")
        
       
       
        if(basket.length == 0){
            cartAmount.innerHTM = 0
        }else{

            cartAmount.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y);
        }
    }

    calc()




/**
 *  ! End Add To Cart 
 **/



