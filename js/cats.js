// ! Authorization 
/*   Authorization Page */
let adminEmail = getCookie("email");
let adminPassword = getCookie("password");

    if(adminEmail !== "iti@yahoo.com" && adminPassword !== "Iti01234" ){
        location.href = "login.html"      
    }


// ! Start Add New Category 
let categoryContainer = [];
let globalindex = 0;
let toggole = false;


// Search Category 

let searchCategory = document.getElementById('searchCategory')
searchCategory.onkeyup = function()
{
    var cols = "";
    for (var i=0;i<categoryContainer.length;i+=1)
       {
            if (categoryContainer[i].name.includes(searchCategory.value.toLowerCase()))
            {
                cols+=`
                <tr>
                    <td>${i}</td>
                    <td>${categoryContainer[i].name}</td>
                    <td>
                        <button class="btn-update" id="btn-delete" onclick="retrive(${i})"><i class="fa fa-edit" </i></button>
                        <button class='btn-delete' onclick='deleteCat(${i})'><i class="fa fa-trash"></i></button>
                    </td>
                </tr>`
            }
       }
    document.getElementById("categoryWrapper").innerHTML=cols;
}
function init ()
{
    if (!toggole)
        {
            addCategory();
            displayCats();
        }
    else 
        {
            updatefun(); 
            btnAddCategory.innerHTML="Add Category"
        }
    
    toggole = false; 
}

if(localStorage.getItem("allCategories") != null){
    categoryContainer = JSON.parse(localStorage.getItem("allCategories"))
    displayCats()
}

for (let index = 0; index < categoryContainer.length; index++) {
    console.log(index);
    categoryContainer.innerHTML += `<option value="${categoryContainer[index]}">${categoryContainer[index]}</option>`
    
}

function addCategory()
{
    let pattern = /^[a-z A-Z\u0621-\u064A0]*$/; // Alow To write Arabic Letters


    if (!document.getElementById("categoryNameInput").value.match(pattern) || document.getElementById("categoryNameInput").value == "" ) {
        document.querySelector(".validateCategoryName").style.display = "block"
    }else{
    document.querySelector(".validateCategoryName").style.display = "none"

    let category = {
        name : categoryNameInput.value,
    }
    categoryContainer.push(category)
    localStorage.setItem("allCategories" , JSON.stringify(categoryContainer))
    displayCats()
    clearForm()
}
}

btnAddCategory.addEventListener("click" , function addCategory(e){
    e.preventDefault()
})

function clearForm(){
    categoryNameInput.value =""    
}

function displayCats(){
    let catsRows = ``

    for (let i = 0; i <  categoryContainer.length; i++) {
        catsRows += `
            <tr>
                <td>${i}</td>
                <td>${categoryContainer[i].name}</td>
                <td><button class='btn-update' onclick='retrive(${i})'><i class="fa-solid fa-pen-to-square fa-xl"></i></button>
                <button class='btn-delete' onclick='deleteCat(${i})'><i class="fa-solid fa-trash fa-xl"></i></button></td>
            </tr`
    }
    document.getElementById("categoryWrapper").innerHTML = catsRows
}

function deleteCat(index){
    categoryContainer.splice(index,1);
    displayCats();
    localStorage.setItem("allCategories" , JSON.stringify(categoryContainer))
}

//  Update and Retrive Functions 

function retrive(id)
{
    categoryNameInput.value = categoryContainer[id].name; 
    toggole = true; 
    globalindex = id; 
    btnAddCategory.innerHTML="Update Category";
}

function updatefun()
{
    categoryContainer[globalindex].name = categoryNameInput.value; 
    localStorage.setItem("allCategories" , JSON.stringify(categoryContainer));
    displayCats(); 
    clearForm();
}

// ! End Add New Category
