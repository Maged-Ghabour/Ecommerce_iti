// ! Authorization 
/*   Authorization Page */
let adminEmail = getCookie("email");
let adminPassword = getCookie("password");

    if(adminEmail !== "iti@yahoo.com" && adminPassword !== "Iti01234" ){
        location.href = "login.html"      
    }
/*   Authorization Page */
      



// ! Start Add New Category 




let categoryContainer = [];
if(localStorage.getItem("allCategories") != null){
    categoryContainer = JSON.parse(localStorage.getItem("allCategories"))
  displayCats()
}

for (let index = 0; index < categoryContainer.length; index++) {
    console.log(index);
    categoryContainer.innerHTML += `<option value="${categoryContainer[index]}">${categoryContainer[index]}</option>`
    
}



btnAddCategory.addEventListener("click" , (e)=>{

    e.preventDefault()

let pattern = /^[a-z A-Z\u0621-\u064A0]*$/; // Alow To write Arabic Letters


if (!document.getElementById("categoryNameInput").value.match(pattern) || document.getElementById("categoryNameInput").value == "" ) {
    document.querySelector(".validateCategoryName").style.display = "block"
}else{
    document.querySelector(".validateCategoryName").style.display = "none"

    e.preventDefault()

    let category = {
        name : categoryNameInput.value,
    }



    
    categoryContainer.push(category)

    localStorage.setItem("allCategories" , JSON.stringify(categoryContainer))

    displayCats()

    clearForm()

}
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
                <td><button class='btn-update' onclick=''><i class="fa-solid fa-pen-to-square fa-xl"></i></button>
                <button class='btn-delete' onclick='deleteCat(${i})'><i class="fa-solid fa-trash fa-xl"></i></button></td>
            
            
            </tr>
        `
        
    }
    document.getElementById("categoryWrapper").innerHTML = catsRows
}


function deleteCat(index){

    categoryContainer.splice(index,1);
    displayCats();
    localStorage.setItem("allCategories" , JSON.stringify(categoryContainer))
}




// ! End Add New Category
