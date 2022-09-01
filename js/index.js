
let productsContainer = [];

if(localStorage.getItem("allProducts") != null){
    productsContainer = JSON.parse(localStorage.getItem("allProducts"))
    displayProducts()
}
let cats = JSON.parse(localStorage.getItem("allCategories"));


function displayProducts(){
    let productsRows = ``

    for (let i = 0; i <  productsContainer.length; i++) 
    {

        productsRows += `
            <div class="cards ${productsContainer[i].category} ">
             <img src="${productsContainer[i].image.replace("C:\\fakepath\\" , "imgs/")}" alt="Avatar" style="width:100% ;border-radius:5% 5% 0 0"> 
             <h4>${productsContainer[i].name}</h4>
             <p>${productsContainer[i].category}</p>
             <small> ${productsContainer[i].price} $</small>
             <input type="button" value="Add To Card">
            </div>`
    }
    document.getElementById("product").innerHTML = productsRows
}


//  ! Start Show Categories 



function displayCats(){
   
    let cats = JSON.parse(localStorage.getItem("allCategories"));
    let catsRows = ``
    for (let i = 0; i <  cats.length; i++) {
        catsRows += `
                <li data-cat=".${cats[i].name}">${cats[i].name}</li>`
                console.log(catsRows);
    }
    document.getElementById("cats").innerHTML = catsRows
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
    })
}