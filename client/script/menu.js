let allFoodItems = [];
let allFoodTypeFilters = [];
let filteredResult = [];

async function getAllFoodItems(){
    try{
        const listCardEl = document.getElementById('menu__cardWrapper');
        listCardEl.innerHTML = '';
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(SERVER_URI+'api/food/get-all-food',{
            method:'GET',
            headers: {
                'x-access-token':user?.token
              }
        });
        const result = await response.json();
        allFoodItems = result;
        console.log(result);
        let filterListWrapper = document.getElementById('filterList');
        if(response.status===200 && result.length > 0){
            result.forEach((item,i)=>{
                if(!allFoodTypeFilters.includes(item.foodType)){
                    allFoodTypeFilters.push(item?.foodType);
                    let filterHtml = `<div onclick="handleFilterFood('${item?.foodType}')" id="${item?.foodType}" class="filterItem">
                    ${item?.foodType}
                </div>`
                    filterListWrapper.insertAdjacentHTML('beforeend',filterHtml)
                }
                if(!allFoodTypeFilters.includes(item?.category)){
                    allFoodTypeFilters.push(item?.category);
                    let filterHtml = `<div onclick="handleFilterFood('${item?.category}')" id="${item?.category}" class="filterItem">
                    ${item?.category}
                </div>`
                    filterListWrapper.insertAdjacentHTML('beforeend',filterHtml)
                }
                let html = `<div class="col" key={${i}}>
                <div class="card">
                  <div class="cardBgImg" style="background-image:url('${SERVER_URI+item?.imageLink.split('\\')[1]}')">
                  
                  </div>
                  <div class="card-body">

                   <div class="d-flex justify-content-between">
                   <h5 class="card-title">${item?.title}</h5>
                    <div>
                    <span class="badge text-bg-warning">${item.category}</span>
                    <span class="badge text-bg-secondary">${item.foodType}</span>
                    </div>
                   </div>
                    <p class="card-text">${item?.description}</p>
                    <div class="card-footer d-flex justify-content-between">
                        <h4>$${item?.price}</h4>
                        <div>
                        <button onclick="setCartItems('${item._id}')" class="primaryBtn">Add to Cart <i class="fa-solid fa-cart-shopping"></i></button>
                        </div>
                    </div>
                  </div>
                </div>
              </div>`
              listCardEl.insertAdjacentHTML('beforeend',html);
            })
        }
    }catch(err){
        console.log(err);
        showToast('<span class="text-danger">Error</span>',err);
    }
}


getAllFoodItems();


function handleSearchFood(e){
    let query = e.target.value;
    filteredResult = allFoodItems.filter((item)=>{
        return item.title.toLowerCase().match(query.toLowerCase())
    })
   
    // console.log(query);
    // console.log(filteredResult);
    if(!query){
       addItemToMenuWrapper(allFoodItems);
    }
    if(filteredResult.length > 0){
       addItemToMenuWrapper(filteredResult);
    }
}


function handleFilterFood(filter){
    // console.log(filter);
    let filterListWrapper = document.getElementById('filterList');
    for(let i=0;i<filterListWrapper.children.length;i++){
        let listItem = filterListWrapper.children[i];
        listItem.classList.remove('activeFilterItem')
    };
    document.getElementById(filter).classList.add('activeFilterItem');
    
    if(filter==='All'){
        addItemToMenuWrapper(allFoodItems);
        return;
    }
    if(filteredResult.length > 0){
        let filteredList = filteredResult.filter((item)=>{
            return item.foodType===filter || item?.category===filter
        });
        if(filteredList.length > 0){
           addItemToMenuWrapper(filteredList);
           
        }else{
          addItemToMenuWrapper(allFoodItems);
        }

    }else{
        let filteredList = allFoodItems.filter((item)=>{
            return item.foodType===filter || item?.category===filter
        });
        if(filteredList.length > 0){
           addItemToMenuWrapper(filteredList);
           
        }else{
          addItemToMenuWrapper(allFoodItems);
        }
    }

}


function addItemToMenuWrapper(foodList){
    const listCardEl = document.getElementById('menu__cardWrapper');
    listCardEl.innerHTML = '';
    foodList.forEach((item,i)=>{
        let html = `<div class="col" key={${i}}>
        <div class="card">
          <div class="cardBgImg" style="background-image:url('${SERVER_URI+item?.imageLink.split('\\')[1]}')">
          
          </div>
          <div class="card-body">

           <div class="d-flex justify-content-between">
           <h5 class="card-title">${item?.title}</h5>
            <div>
            <span class="badge text-bg-warning">${item.category}</span>
            <span class="badge text-bg-secondary">${item.foodType}</span>
            </div>
           </div>
            <p class="card-text">${item?.description}</p>
            <div class="card-footer d-flex justify-content-between">
                <h4>$${item?.price}</h4>
                <div>
                <button class="primaryBtn" onclick="setCartItems('${item._id}')">Add to Cart <i class="fa-solid fa-cart-shopping"></i></button>
                </div>
             </div>
          </div>
        </div>
      </div>`
      listCardEl.insertAdjacentHTML('beforeend',html);
    })

}