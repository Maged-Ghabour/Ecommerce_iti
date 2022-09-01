//   ! Start Add Product Page 





let productsContainer = [];

// ! retrive Cart from localStorage 
let basket = JSON.parse(localStorage.getItem("cartData")) || []


if(localStorage.getItem("allProducts") != null){
    productsContainer = JSON.parse(localStorage.getItem("allProducts"))
    displayProducts()
}







function displayProducts(){

    let productsRows = ``

    for (let i = 0; i <  productsContainer.length; i++) {

        let id = productsContainer[i].id

        let search = basket.find((x)=> x.id === id) || []

        console.log(search);
        
        productsRows += `
        
            <div class="cards" id="product-id-${productsContainer[i].id}">
                
             <img src="${productsContainer[i].image.replace("C:\\fakepath\\" , "imgs/")}" alt="Avatar" style="width:100% ;border-radius:5% 5% 0 0"> 
             <h4>${productsContainer[i].name}</h4>
             <p>${productsContainer[i].category}</p>
             <small> ${productsContainer[i].price} $</small>
          
             <button type="button"> 
                    <div class="footer-cart">
                            <span onclick="increment(${id})">+</span>
                            <span id="${id}" onclick="output()" class="quantity"> ${search.item === undefined ? 0 : search.item} </span>
                            <span onclick="decrement(${id})">-</span>
                    </div>
            </button>
             
              
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