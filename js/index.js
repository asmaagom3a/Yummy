//
//

// Show the loading screen when data is being loaded
document.getElementById("loading-screen").style.display = "block";

// Load the data
loadData(function() {
  // Hide the loading screen when data is ready
  document.getElementById("loading-screen").style.display = "none";
});

function loadData(callback) {
  // Load the data here
  // ...
  
  // Call the callback function when data is ready
  callback();
}


// 
// 
let showData = document.getElementById("showData");

let searchContainer = document.getElementById("searchContainer");
let submitBtn;

// document.querySelector(".loading").classList.replace( "d-none","d-flex");
// =======> Side Navbar <========
const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
});

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeText.innerText = "Light mode";
  } else {
    modeText.innerText = "Dark mode";
  }
});

async function getMeals() {

  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  let newRespone = await respone.json();

  displayMeals(newRespone.meals);
  console.log(newRespone.meals);
}
getMeals();

function displayMeals(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
            <div class="col-md-3">
                 <div onclick="getMealDetails('${arr[i].idMeal}')"class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <div class="meal position-relative rounded-2 ">
                         <img src="${arr[i].strMealThumb}" alt="" class="w-100" srcset="">
                           <div class="meal-layar position-absolute d-flex justify-content-center align-items-center flex-column p-2">
                              <h3 class="px-3">${arr[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>
                </div>`;
  }
  showData.innerHTML = cartoona;
}

async function getArea() {

    showData.innerHTML="";
    $(".loading-screen").fadeIn(5000);
    searchContainer.innerHTML = "";


  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list` );
  let nweRespose = await respone.json();

  document.querySelector(".area").addEventListener("click", () => {
    $(".loading-screen").fadeIn(5000);

    displayArea(nweRespose.meals);
  });

}
getArea();

function displayArea(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-3">
        <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
        <i class='bx bx-home-heart fa-4x'></i>
        <h4 class="p-2">${arr[i].strArea}</h4>
        </div>
        </div>
        `;
  }
  showData.innerHTML = cartoona;
}

async function getCategories() {
  // showData.innerHTML = ""
  // $(".loading").fadeIn(300)
  // searchContainer.innerHTML = "";

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let nweRespose = await respone.json();

  // $(".loading").fadeOut(300);
  document.querySelector(".categories").addEventListener("click", () => {
    displayCategories(nweRespose.categories);
    // document.querySelector(".loading").classList.replace("d-none","d-flex");
  });
  //   console.log(nweRespose.categories);
}
getCategories();

function displayCategories(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${
                  arr[i].strCategory
                }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${
                      arr[i].strCategoryThumb
                    }" alt="" srcset="">
                    <div class="meal-layar position-absolute d-flex justify-content-center align-items-center flex-column p-3">
                        <h3 class = "text-center">${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                    </div>
                </div>
        </div>
        `;
  }

  showData.innerHTML = cartoona;
}

async function getIngredients() {
  let respone = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let newRespone = await respone.json();

  document.querySelector(".ingredients").addEventListener("click", () => {
    displayIngredients(newRespone.meals.slice(0, 20));
  });

  // console.log(newRespone.meals);
}
getIngredients();

function displayIngredients(arr) {
  let cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-3">
        <div onclick="getIngredientsMeals('${
          arr[i].strIngredient
        }')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3 class="px-3">${arr[i].strIngredient}</h3>
                <p>${arr[i].strDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</p>
        </div>
        </div>`;
  }
  showData.innerHTML = cartoona;
}

async function getAreaMeals(area) {
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let newRespone = await respone.json();

  displayMeals(newRespone.meals.slice(0, 20));
}

async function getCategoryMeals(category) {
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let newRespone = await respone.json();

  // console.log(newRespone.meals);
  displayMeals(newRespone.meals.slice(0, 20));
}

async function getIngredientsMeals(ingredient) {
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  let newRespone = await respone.json();

  console.log(newRespone.meals);
  displayMeals(newRespone.meals.slice(0, 20));
}

async function getMealDetails(idMeal) {
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  let newRespone = await respone.json();

  displayMealDetails(newRespone.meals[0]);
  console.log(newRespone.meals);
}

getMealDetails();

function displayMealDetails(meal) {
  //   searchContainer.innerHTML = "";

  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `
      <li class="alert alert-primary m-2 p-1">${meal[`strMeasure${i}`]} ${
        meal[`strIngredient${i}`]
      }</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  // let tags = meal.strTags.split(",")
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let cartoona = `
    <div class="col-md-4">
    <img src="${meal.strMealThumb}" alt="" class="rounded-2 w-100">
    <h2 class="py-4 text-center">${meal.strMeal}</h2>
</div>

<div class="col-md-8">
    <h3>Instructions</h3>
    <p class="lead py-3">${meal.strInstructions}</p>
      <h3><span class="fw-bold">Area :</span>  ${meal.strArea}</h3>
      <h3 class="my-4"><span class="fw-bold">Category :</span>  ${meal.strCategory}</h3>
      <h3>Recipes :</h3>

      <ul class="list-unstyled d-flex g-3 flex-wrap">
      ${ingredients}
      </ul>

      <h3>Tags :</h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap">
      ${tagsStr}
       </ul>
      <a href="${meal.strSource}" class="btn btn-success p-2 m-4" target="_blank">Source</a>
      <a href="${meal.strYoutube}" class="btn btn-danger p-2" target="_blank">YouTube</a>
</div>`;

  showData.innerHTML = cartoona;
}

// ==========> Search <=========

function displaySearch (){

    searchContainer.innerHTML=`
    <div class="row py-5 g-4 px-5">
            <div class="col-md-6">
                <input onkeyup="searchName(this.value)" type="text" class="form-control  p-3" placeholder="Search By Name ...">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchFirestName(this.value)" maxlength="1" type="text" class="form-control p-3" placeholder="Search By First letter ...">
            </div>
    </div>`;

    showData.innerHTML= " "
}
document.querySelector(".search").addEventListener("click" , () => {
    displaySearch ()
})

async function searchName (characters){

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${characters}`);
    let newRespone = await respone.json();

    newRespone.meals ? displayMeals(newRespone.meals) : displayMeals([]);

}

async function searchFirestName (characters){

    characters == "" ? characters = "a" : "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${characters}`);
    let newRespone = await respone.json();

    console.log(newRespone.meals);

    newRespone.meals ? displayMeals(newRespone.meals) : displayMeals([]);

}

// =================>validation <==================

document.querySelector(".contact").addEventListener("click", () => {
  showData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;

  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
});

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}










