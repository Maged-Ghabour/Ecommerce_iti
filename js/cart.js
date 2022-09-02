let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let allProducts = JSON.parse(localStorage.getItem("allProducts"));

console.log(allProducts);


let basket = JSON.parse(localStorage.getItem("cartData")) || [];

let calc = ()=>{
  let cartAmount = document.getElementById("cartAmount")
  if(basket.length == 0){
    cartAmount.innerHTM = 0
  }else{

    cartAmount.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y);
  }
}
calc()








let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket.map((x) => {

      let id = x.id
      let item = x.item

      let search = allProducts.find((y)=> y.id == id) || []
        return `
          <div class="cart-item">
          <img width="100" src="${(search.image).replace("C:\\fakepath\\" , "imgs/")}" />
          <div class="details">

          </div>
              <div class="title-price-x">
              <h4  class="title-price">
                <p>${search.name}</p>
                
                <p class="cart-item-price">$ ${search.price}</p>
                
              </h4>
                <i class="fa-solid fa-xmark"></i>
              </div>


              <div class="buttons">
                  <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                    <div id="${id}" class="quantity">
                      ${item}
                    </div>
                  <i  onclick="decrement(${id})" class="fa-solid fa-minus"></i>
              </div>
              <h3>$ ${item * search.price} </h3>
          </div>
          </div>
        `
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
      <img src="../imgs/empty_cart.svg" width="500px" height="500px"/>
    <a href="index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  
  let search = basket.find((x) => x.id === id);

  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  output(id);
  localStorage.setItem("cartData", JSON.stringify(basket));
};
let decrement = (id) => {
  localStorage.setItem("cartData" , JSON.stringify(basket))
  let search = basket.find((x) => x.id === id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  output(id)
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("cartData", JSON.stringify(basket));
};

let output = (id) => {
  let search = basket.find((x) => x.id === id);

  document.getElementById(id).innerHTML = search.item;

  calc()
  TotalAmount();
};

let removeItem = (id) => {


  basket = basket.filter((x) => x.id !== id);
  generateCartItems();
  TotalAmount();
  localStorage.setItem("allProducts", JSON.stringify(basket));
};

let clearCart = () => { 
  basket = [];
  generateCartItems();
  localStorage.setItem("allProducts", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = allProducts.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};

TotalAmount();
