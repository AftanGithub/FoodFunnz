async function getUserOrders(){
try{
    const userOrderWrapper = document.getElementById('userOrderWrapper');
    
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(SERVER_URI+'api/orders/get-user-orders/'+user.id,{
        method:'GET',
        headers: {
            'x-access-token':user?.token
          }
    });
    const result = await response.json();
    console.log(result);
    if(response.status===200 && result.length > 0){
        userOrderWrapper.innerHTML = '';
        result?.forEach((order,i)=>{
            let html = `<div class="card p-2 shadow-sm my-3 mb-4">
                <div class="d-flex justify-content-between align-items-center">
                    <h3>Order #${i+1}</h3>
                    <div class="badge bg-warning">
                    ${order?.status}
                    </div>
                </div>
                
               <div class="d-flex justify-content-between align-items-center">
               <span class="text-secondary">Trn ID: ${order?.paymentDetails?.transationId}</span>
               <span>Created At : ${order?.createdAt}</span>
               </div>

              `;

              let finalCartData = {};
              order?.foods?.forEach((item)=>{
                if(finalCartData[item.id]){
                    finalCartData[item.id] = {...finalCartData[item.id],data: item,count:finalCartData[item.id]?.count + 1,price:item?.food?.price}
                }else{
                    finalCartData[item.id] = {...finalCartData[item.id],data: item,count: 1,price:item?.food?.price}
                }
                });
                for (const [key, value] of Object.entries(finalCartData)) {
                    let foodItem = value;
                    console.log(foodItem);
                    html+=`
                <div class="order__miniCard p-3 m-2 ">
                    
                   <div class="d-flex flex-column align-items-center">
                   <img src="${SERVER_URI+foodItem?.data?.food?.imageLink.split('\\')[1]}" alt="img" />
                   
                   <b>${foodItem?.data?.food?.title}</b>
                   </div>
                    <div class="order__miniCardInfo">
                    <div>Price: $${foodItem?.price}</div>
                    <div>Qty: ${foodItem?.count}</div>
                    <div>Amount: $${parseFloat(foodItem?.price*foodItem?.count)}</div>
                    </div>
                </div>
                `
                }

                html+=`
                <div class="d-flex p-3 justify-content-between align-items-center">
                <h4 >Total Amount </h4>
                <h4>$${order?.paymentDetails?.amount}</h4>
                </div>
                `
                userOrderWrapper.insertAdjacentHTML('beforeend',html);
        });

    }
}catch(err){
    console.log(err);
    showToast('<span class="text-danger">Error</span>',err);
}

}

getUserOrders();
