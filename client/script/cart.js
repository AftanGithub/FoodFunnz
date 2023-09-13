let finalCartData = {};
function getCartData(){
    finalCartData = {};
    const cartData = JSON.parse(localStorage.getItem('cartData'));
    const cartListWrapper = document.getElementById('cartListWrapper');
   
    cartData?.forEach((item)=>{
        if(finalCartData[item.id]){
            finalCartData[item.id] = {...finalCartData[item.id],data: item,count:finalCartData[item.id]?.count + 1,price:item?.food?.price}
        }else{
            finalCartData[item.id] = {...finalCartData[item.id],data: item,count: 1,price:item?.food?.price}
        }
    });
    console.log(finalCartData);
    if(cartData?.length > 0){
        cartListWrapper.innerHTML = '';
    }else{
        cartListWrapper.innerHTML = `<h4 class="text-secondary">No Items Added</h4>`;
    }
    for (const [key, value] of Object.entries(finalCartData)) {
        
        let item = value?.data?.food;
        let count = value?.count;
        let price = value?.price;
        let html = `
        <div class="card d-flex m-3 mb-4 flex-row">
            <img class="w-25" src="${SERVER_URI+item?.imageLink.split('\\')[1]}"/>
            <div class="card-body w-75">
            <h4>${item?.title}</h4>
            <div class="d-flex justify-content-between align-items-center">
            <h5 >$${price}</h5>
            <div class="d-flex">
            <div class="input-group mb-3">
  <span class="btn" onclick="onDecrementCartItem('${key}')">-</span>
  <input type="number" disabled id="${key}" min="1" class="form-control mx-2" style="width:70px" value="${count}" />
  <button class="btn" onclick="onIncrementCartItem('${key}')">+</button>
</div>
           
            <button class="primaryBtn" onclick="handleRemoveCartItem('${key}')">Remove</button>
            </div>

            </div>
            </div>
           
        </div>`
        cartListWrapper.insertAdjacentHTML('beforeend',html);
      }
    console.log(cartData);
}

getCartData();
checkoutCard();

function checkoutCard(){
    let totalAmounts = 0;
    let cartData = JSON.parse(localStorage.getItem('cartData'));
    cartData.forEach((item)=>{
        console.log(item);
        totalAmounts +=item?.food?.price;
    });
    let checkoutWrapper = document.getElementById('checkout__card');
    checkoutWrapper.innerHTML = '';
    checkoutWrapper.insertAdjacentHTML('beforeend',`
        <h4 class="text-center m-3">Summary</h4>
        <hr/>
       
        <div class="row">
            <div class="col bold">Item</div>
            <div class="col bold">Price</div>
            <div class="col bold">Qty.</div>
            <div class="col bold">Total</div>
        </div>
        <hr/>
       

    `);
    for (const [key, value] of Object.entries(finalCartData)) {
        console.log(value);
        let html = `<div class="row">
                <div class="col"><small>${value?.data?.food?.title}</small></div>
                    <div class="col">${value?.price}</div>
                    <div class="col">${value?.count}</div>
                    <div class="col bold">${parseFloat(value?.price * value?.count)}</div>
            </div>
            <hr/>
            `

        checkoutWrapper.insertAdjacentHTML('beforeend',html);
    }

    checkoutWrapper.insertAdjacentHTML('beforeend',`
    <div class="d-flex justify-content-between ">
        <div>
            <h4>Grand Total</h4>
        </div>
        <div>
            <h4>$${totalAmounts}</h4>
        </div>
    </div>
    <a href="/checkout.html" onclick={handleSetAmountInLocal('${totalAmounts}')} class="primaryBtn mt-3 text-center">Checkout</a>
    `)

    
    
}

function handleSetAmountInLocal(amount){
    localStorage.setItem('amount',amount);
}

function onDecrementCartItem(id){
    console.log(id);
    if(document.getElementById(id).value ===1){
        return;
    }
    document.getElementById(id).value = document.getElementById(id).value - 1;
    removeSingleCartItem(id);
    getCartData();
    checkoutCard();

}

function onIncrementCartItem(id){
    console.log(id);
    document.getElementById(id).value = document.getElementById(id).value + 1;
    addSingleCartItem(id);
    getCartData();
    checkoutCard();
}


function handleRemoveCartItem(id){
    removeCartItems(id);
    getCartData();
    checkoutCard();

}
