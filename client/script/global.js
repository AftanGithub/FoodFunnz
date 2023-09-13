const SERVER_URI = 'http://localhost:5000/';


function checkIsLoggedIn(){
  const loginWrapper = document.getElementById('navListWrapper');
  const user = JSON.parse(localStorage.getItem('user'));
  const isCart = window.location.pathname==='/cart.html';
  const totalCartItems = JSON.parse(localStorage.getItem('cartData')) ? JSON.parse(localStorage.getItem('cartData')).length : 0;

  if(user){
    let userInfo = `
    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                     <img class="userProfileIcon" src="./assets/user.png" alt=" "/><span> ${user?.username}</span>
                    </a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="${user.roles ==='ROLE_ADMIN' ? './admin-dashboard.html':'./user-dashboard.html'}">Dashboard</a></li>
                      <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                    
                    </ul>
                  </li>
                  <li class="nav-item">
  <a class="nav-link position-relative ${isCart ? 'active':''}" href="./cart.html"><i class="fa-solid fa-cart-shopping "></i><span id="totalCartItemsCount" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
  ${totalCartItems}
</span></a>
  </li>
                          
    `;
    loginWrapper.insertAdjacentHTML('beforeend',userInfo);
  }else{
    let loginHtml = `

    <li class="nav-item">
    <a class="nav-link" href="./login.html">Login</a>
  </li>
  <li class="nav-item">
  <a class="nav-link" href="./register.html">Register</a>
  </li>
  <li class="nav-item">
  <a class="nav-link position-relative ${isCart ? 'active':''}" href="./cart.html"><i class="fa-solid fa-cart-shopping "></i><span id="totalCartItemsCount" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
  ${totalCartItems}
</span></a>
  </li>
   `;
    loginWrapper.insertAdjacentHTML('beforeend',loginHtml);
  }


};

if(window.location.pathname!=='/register.html' && window.location.pathname!=='/login.html' && window.location.pathname!=='/checkout.html'){
  checkIsLoggedIn();
}

if(window.location.pathname==='/user-dashboard.html' && !JSON.parse(localStorage.getItem('user'))){

    window.location.pathname='/login.html';
}


async function handleSubmitFeedback(){
 try{
  const suggestion = document.getElementById('suggestion').value;
  var ele = document.getElementsByName('rating');
  const user = JSON.parse(localStorage.getItem('user'));
  if(!user || !user.token){
    showToast('<span class="text-danger">Error</span>',"Login is required for submitting feedback!");
    return;
  }
  let rating = '';
 
  for (i = 0; i < ele.length; i++) {
      if (ele[i].checked)
         rating = ele[i].value;
  }
  const data = {
    user:user.id,
    rating:rating,
    suggestion:suggestion
  }

  const response = await fetch(SERVER_URI+'api/feedback/create-new-feedback',{
    method:'POST',
    headers: {
        "Content-Type": "application/json",
        'x-access-token':user?.token
      },
    body: JSON.stringify(data)
});
const result = await response.json();
console.log(result);

if(response.status===200){
  showToast('<span class="text-success">Feedback Submitted</span>',"Thank You For Your Valuable Feedback!");
}


 }catch(err){
  console.log(err);
  showToast('<span class="text-danger">Error</span>',err);
 }
}


async function setCartItems(id){
  console.log(id);
  try{
    const response = await fetch(SERVER_URI+'api/food/get-single-food/'+id,{
      method:'GET',
  });
  const result = await response.json();
  if(response.status===200 && result){
    let prevCart = JSON.parse(localStorage.getItem('cartData')) ? JSON.parse(localStorage.getItem('cartData')) : [];
    let cartData = {id:id,food:result,toppings:[]};
    prevCart.push(cartData);
    console.log(prevCart);
    localStorage.setItem('cartData',JSON.stringify(prevCart));
    document.getElementById('totalCartItemsCount').innerHTML = prevCart.length;
    showToast('<span class="text-success">Cart Status</span>',`${result?.title} added to cart successfully!`);
  }else{
    showToast('<span class="text-danger">Error</span>',result?.message);
  }

  }catch(err){
    console.log(err);
    showToast('<span class="text-danger">Error</span>',err);
  }
  
}

function removeCartItems(id){
  console.log(id)
  let prevCart = JSON.parse(localStorage.getItem('cartData')) ? JSON.parse(localStorage.getItem('cartData')) : [];
  let filteredCart = prevCart.filter((item)=>item.id!==id);
  localStorage.setItem('cartData',JSON.stringify(filteredCart));
  console.log(prevCart);
  const currentCart = JSON.parse(localStorage.getItem('cartData'));
  document.getElementById('totalCartItemsCount').innerHTML = currentCart.length;
}

function removeSingleCartItem(id){
  console.log(id);

  let prevCart = JSON.parse(localStorage.getItem('cartData')) ? JSON.parse(localStorage.getItem('cartData')) : [];
  let index = prevCart.findIndex(item=>item?.id===id);
  prevCart.splice(index,1);
  localStorage.setItem('cartData',JSON.stringify(prevCart));
  console.log(prevCart);
  document.getElementById('totalCartItemsCount').innerHTML = prevCart.length;
}

function addSingleCartItem(id){
  console.log(id);

  let prevCart = JSON.parse(localStorage.getItem('cartData')) ? JSON.parse(localStorage.getItem('cartData')) : [];
  let index = prevCart.find(item=>item?.id===id);
  prevCart.push(index);
  localStorage.setItem('cartData',JSON.stringify(prevCart));
  console.log(prevCart);
  document.getElementById('totalCartItemsCount').innerHTML = prevCart.length;
}

async function getPopularMeals(){

  try{
    const response = await fetch(SERVER_URI+'api/food/get-all-food',{
      method:'GET'
     });
     const result = await response.json();
     if(response.status===200 && result && result.length > 0){
      let popularCardWrapper = document.getElementById('mealCardWrapper');
      let breakfastMenuCard = document.getElementById('breakfastMenuCard');
      let lunchMenuCard = document.getElementById('lunchMenuCard');
      let dinnerMenuCard = document.getElementById('dinnerMenuCard');
      result.forEach((item,i)=>{
        if(i<10){
          let cardHtml = `<div class="menu__item">
          <img src="${SERVER_URI+item?.imageLink.split('\\')[1]}"/>
         <div class="menu__itemInfoText">
          <div class="menu__itemInfoTextHeader">
              <h3>${item?.title} </h3>
              <h3><span class="primaryText">$${item?.price}</span></h3>
          </div>
          <p>${item?.description.slice(0,100)}...</p>
          <button class="primaryBtn" type="button" onclick="setCartItems('${item._id}')">Add to Cart <i class="fa-solid fa-cart-shopping"></i></button>
         </div>
      </div>`;
          if(item?.category.toLowerCase()==='breakfast'){
            breakfastMenuCard.insertAdjacentHTML('beforeend',cardHtml);
          }else if(item?.category.toLowerCase()==='lunch'){
            lunchMenuCard.insertAdjacentHTML('beforeend',cardHtml);
          }else if(item?.category.toLowerCase()==='dinner'){
            dinnerMenuCard.insertAdjacentHTML('beforeend',cardHtml);
          }
        }
        if(i<4){
          let html = `<div class="meal__card">
          <img src="${SERVER_URI+item?.imageLink.split('\\')[1]}" alt="meal5" />
          <div class="meal__cardInfo">
             <div>
              <div class="mealCardHeader">
                  <h3>${item?.title}</h3>
              <span class="primaryText">$${item?.price}</span>
              </div>
              <p>${item?.description}</p>
             </div>
              <div class="meal__btnWrapper w-100 d-flex justify-content-between align-items-center">
              <div>
              <span class="badge text-bg-warning">${item.category}</span>
              <span class="badge text-bg-secondary">${item.foodType}</span>
              </div>
              <button type="button" onclick="setCartItems('${item._id}')" class="primaryBtn">Add to Cart <i class="fa-solid fa-cart-shopping"></i></button>
              
              </div>
          </div>
      </div>`
      popularCardWrapper.insertAdjacentHTML('beforeend',html);
        }
      })
     }

  }catch(err){
    console.log(err);
    showToast('<span class="text-danger">Error</span>',err);
  }
}

if(window.location.pathname ==='/' || window.location.pathname==='/index.html'){
  getPopularMeals();
}



function navToggleClick() {
  // console.log('clicked');
    var x = document.getElementById("myTopnav");

  

    if (x.className === "topnav" || x.className==='topnav nav-transparent') {
      x.className += " responsive";
      if(x.classList.contains('nav-transparent')){
        x.classList.remove('nav-transparent');
      }
    } else {
      x.className = "topnav";
    }
  }


  const myNav = document.getElementById('myTopnav');
  if(myNav){
    window.onscroll = function () { 
      // console.log(document.body.scrollTop)
      
    
        if (document.body.scrollTop >= 200 || document.documentElement.scrollTop >= 200 ) {
            
            myNav.classList.remove("nav-transparent");
        } 
        else {
            myNav.classList.add("nav-transparent");
            
        }
    };
  }
 

  function logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('cartData');
    alert('Your cart will be lost after you logout!');
    alert("Logged out successfully!");
    window.location.pathname='./login.html';
  }

  function redirect(pathname){
    window.location.pathname = pathname;

  }


  function showToast(title='',msg='',redirect){

    const toastLiveExample = document.getElementById('liveToast')
    const toastTitle = document.getElementById('toastTitle');
    const toastBody = document.getElementById('toastBody');
    const toastCloseBtn = document.getElementById('toastCloseBtn');
    if(redirect){
      // console.log(redirect);
      toastCloseBtn.setAttribute('onclick',`redirect('${redirect}')`)
    }
   
    toastTitle.innerHTML = title;
    toastBody.innerHTML = msg;
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show();

  }

  // showToast('Test','test body');