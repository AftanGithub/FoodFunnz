const foodMainWrapperEl = document.getElementById('foodMainWrapper');
let allFoodItems = [];
let currentUpdatedFood = null;

async function handleSearchFood(e){
    const query = e.target.value;
    const filteredResult = allFoodItems.filter((item)=>{
        return item.title.toLowerCase().match(query.toLowerCase())
    })
    // console.log(query);
    // console.log(filteredResult);
    if(!query){
        const listCardEl = document.getElementById('food__cards');
        listCardEl.innerHTML = '';
        allFoodItems.forEach((item,i)=>{
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
                    <i title="Edit Item?" id="${item?._id}" class="fa-solid fa-pen-to-square fs-4 mx-2" onclick="handleEditFoodItem(event)"></i>
                    <i title="Delete Item?" id="${item?._id}" class="fa-regular fa-trash-can fs-4 mx-2" onclick="handleDeleteFoodItem(event)"></i>
                    </div>
                </div>
              </div>
            </div>
          </div>`
          listCardEl.insertAdjacentHTML('beforeend',html);
        })
    }
    if(filteredResult.length > 0){
        const listCardEl = document.getElementById('food__cards');
        listCardEl.innerHTML = '';
        filteredResult.forEach((item,i)=>{
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
                    <i title="Edit Item?" id="${item?._id}" class="fa-solid fa-pen-to-square fs-4 mx-2" onclick="handleEditFoodItem(event)"></i>
                    <i title="Delete Item?" id="${item?._id}" class="fa-regular fa-trash-can fs-4 mx-2" onclick="handleDeleteFoodItem(event)"></i>
                    </div>
                </div>
              </div>
            </div>
          </div>`
          listCardEl.insertAdjacentHTML('beforeend',html);
        })
    }
}


async function getAllFoodItems(){
    try{
        const listCardEl = document.getElementById('food__cards');
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
        if(response.status===200 && result.length > 0){
            result.forEach((item,i)=>{
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
                        <i title="Edit Item?" id="${item?._id}" class="fa-solid fa-pen-to-square fs-4 mx-2" onclick="handleEditFoodItem(event)"></i>
                        <i title="Delete Item?" id="${item?._id}" class="fa-regular fa-trash-can fs-4 mx-2" onclick="handleDeleteFoodItem(event)"></i>
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


async function handleEditFoodItem(e){
    const user = JSON.parse(localStorage.getItem('user'));
    try{
        let id = e.target.id;
        const response = await fetch(SERVER_URI+'api/food/get-single-food/'+id,{
            method:'GET',
            headers: {
                'x-access-token':user?.token
              },
        });
        const result = await response.json();
        if(response.status===200 && result){
            // console.log(result);
            showFoodUpdateForm(result);
         
        }else{
            showToast('<span class="text-danger">Error</span>',result?.message);
           
        }
        
    }catch(err){
        console.log(err);
        showToast('<span class="text-danger">Error</span>',err);
    }

}


 function showFoodUpdateForm(data){
    const foodListWrapperEl = document.getElementById('foodListWrapper');
    const foodUpdateFormWrapperEl = document.getElementById('foodUpdateWrapper');

    foodUpdateFormWrapperEl.style.display = 'block';
    foodListWrapperEl.style.display = 'none';
    currentUpdatedFood = data;
    document.getElementById('updatedFormTitle').innerHTML = data?.title;
   
    document.getElementById('updatedfoodName').value = data?.title;
    document.getElementById('updatedfoodPrice').value =  data?.price;
    document.getElementById('updatedfoodCategory').value =  data?.category;
    document.getElementById('updatedfoodCuisine').value =  data?.foodType;
    document.getElementById('updatedfoodDescription').value =  data?.description;
    document.getElementById('updatedfoodImg').value = null;
}

function hideFoodUpdateForm(){
    const foodListWrapperEl = document.getElementById('foodListWrapper');
    const foodUpdateFormWrapperEl = document.getElementById('foodUpdateWrapper');

    foodUpdateFormWrapperEl.style.display = 'none';
    foodListWrapperEl.style.display = 'block';
    getAllFoodItems();
}


async function handleUpdateFoodItems(){
    const title = document.getElementById('updatedfoodName').value;
    const price = document.getElementById('updatedfoodPrice').value;
    const category = document.getElementById('updatedfoodCategory').value;
    const foodType = document.getElementById('updatedfoodCuisine').value;
    const foodImg = document.getElementById('updatedfoodImg').files;
    const description = document.getElementById('updatedfoodDescription').value;
    const foodBtnEl = document.getElementById('updatedfoodBtn');
   
    try{
      
        foodBtnEl.setAttribute('disabled',true);
        foodBtnEl.innerHTML = 'Please wait...';
        const user = JSON.parse(localStorage.getItem('user'));
       
        let imgResult = null;
        if(foodImg.length > 0){
            const formData = new FormData();
            formData.append('name',title + '_' + category);
            formData.append('file',foodImg[0]);
            const res = await  fetch(SERVER_URI+"api/uploadImage", {
                method: 'POST',
                body: formData
            });
             imgResult = await res.json();
        }
        const data = {
            title,
            price,
            description,
            category,
            foodType,
            imageLink:imgResult?.path ? imgResult?.path : currentUpdatedFood.imageLink
        }
        console.log(data);
        const response = await fetch(SERVER_URI+'api/food/update-food/'+currentUpdatedFood._id,{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                'x-access-token':user?.token
              },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result)
        if(response.status===200){
            showToast('<span class="text-success">Food Status</span>','Updated Food Successfully!');
            foodBtnEl.removeAttribute('disabled');
            foodBtnEl.innerHTML = 'Update';

        }else{
            showToast('<span class="text-danger">Error</span>',result?.message);
            foodBtnEl.removeAttribute('disabled');
            foodBtnEl.innerHTML = 'Update';
        }
    }catch(err){
        console.log(err);
        showToast('<span class="text-danger">Error</span>',err);
        foodBtnEl.removeAttribute('disabled');
        foodBtnEl.innerHTML = 'Update';
    }
}



async function handleDeleteFoodItem(e){
    try{
        let id = e.target.id;
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(SERVER_URI+'api/food/delete-food',{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                'x-access-token':user?.token
              },
              body:JSON.stringify({id:id})
        });
        const result = await response.json();
        if(response.status===200){
            showToast('<span class="text-success">Delete Status</span>','Deleted Food Successfully!');
            getAllFoodItems();
         
        }else{
            showToast('<span class="text-danger">Error</span>',result?.message);
           
        }
        
    }catch(err){
        console.log(err);
        showToast('<span class="text-danger">Error</span>',err);
    }
}

function showFoodCreateForm(){
    const foodListWrapperEl = document.getElementById('foodListWrapper');
    const foodFormWrapperEl = document.getElementById('foodCreateWrapper');
    foodFormWrapperEl.style.display = 'block';
    foodListWrapperEl.style.display = 'none';

}

function hideFoodCreateForm(){
    
    const foodListWrapperEl = document.getElementById('foodListWrapper');
    const foodFormWrapperEl = document.getElementById('foodCreateWrapper');
    foodFormWrapperEl.style.display = 'none';
    foodListWrapperEl.style.display = 'block';
    getAllFoodItems();

}


async function handleCreateFoodItems(){
    const title = document.getElementById('foodName').value;
    const price = document.getElementById('foodPrice').value;
    const category = document.getElementById('foodCategory').value;
    const foodType = document.getElementById('foodCuisine').value;
    const foodImg = document.getElementById('foodImg').files;
    const description = document.getElementById('foodDescription').value;
    const foodBtnEl = document.getElementById('foodBtn');
  

    try{
        foodBtnEl.setAttribute('disabled',true);
        foodBtnEl.innerHTML = 'Please wait...';
        const user = JSON.parse(localStorage.getItem('user'));
        const formData = new FormData();
        formData.append('name',title + '_' + category);
        formData.append('file',foodImg[0]);
       
        const res = await  fetch(SERVER_URI+"api/uploadImage", {
            method: 'POST',
            body: formData
        });
        const imgResult = await res.json();
        if(imgResult.path){
            const data = {
                title,
                price,
                description,
                category,
                foodType,
                imageLink:imgResult.path
            }
            console.log(data);
            const response = await fetch(SERVER_URI+'api/food/create-new-food',{
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                    'x-access-token':user?.token
                  },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log(result)
            if(response.status===200){
                showToast('<span class="text-success">Food Status</span>','Created Food Successfully!');
                foodBtnEl.removeAttribute('disabled');
                foodBtnEl.innerHTML = 'Create';
            }else{
                showToast('<span class="text-danger">Error</span>',result?.message);
                foodBtnEl.removeAttribute('disabled');
                foodBtnEl.innerHTML = 'Create';
            }
        }
    
    }catch(err){
        console.log(err);
        showToast('<span class="text-danger">Error</span>',err);
        foodBtnEl.removeAttribute('disabled');
        foodBtnEl.innerHTML = 'Create';
    }


}