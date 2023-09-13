async function getUserOrders(){
    try{
        const userOrderWrapper = document.getElementById('userOrderWrapper');
       
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(SERVER_URI+'api/orders/get-all-orders/',{
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
                let address = order?.paymentDetails?.shipping_address?.address?.line1 + " " + order?.paymentDetails?.shipping_address?.address?.line1 + " " + " " + order?.paymentDetails?.shipping_address?.address?.city + " " + order?.paymentDetails?.shipping_address?.address?.state + " " + order?.paymentDetails?.shipping_address?.address?.country + " " + order?.paymentDetails?.shipping_address?.address?.postal_code;
                let html = `<div class="card p-2 shadow-sm my-3 mb-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <h3>Order #${i+1}</h3>
                        <select id="${order?._id}" class="form-control w-25" onchange="handleUpdateOrderStatus(event)">
                            <option value="Processing">Processing</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>

                  <div class="d-flex justify-content-between align-items-center my-2">
                   <span class="text-secondary">Trn ID: ${order?.paymentDetails?.transationId}</span>
                   <span>Created At : ${order?.createdAt}</span>
                   </div>

                   <div class="d-flex justify-content-between align-items-center my-2">
                   <span class="text-secondary">email: ${order?.User?.email}</span>
                   <span class="text-secondary">username: ${order?.User?.username}</span>
                   </div>

                   <div class="d-flex justify-content-between align-items-center my-2">
                   <span class="text-secondary">Address: ${address}</span>
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
                    <div class="d-flex p-3 justify-content-between align-items-center my-2">
                    <h4 >Total Amount </h4>
                    <h4>$${order?.paymentDetails?.amount}</h4>
                    </div>
                    `
                    userOrderWrapper.insertAdjacentHTML('beforeend',html);
                    console.log(order.status);
                    document.getElementById(order?._id).value = order.status;
            });
    
        }
    }catch(err){
        console.log(err);
        showToast('<span class="text-danger">Error</span>',err);
    }
    
    }


    async function handleUpdateOrderStatus(e){
        let id = e.target.id;
        let value = e.target.value;
        // console.log(id,value);
        try{ 
            const user = JSON.parse(localStorage.getItem('user'));
            let data = {
                status:value
            }
            const response = await fetch(SERVER_URI+'api/orders/update-order/'+id,{
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
            showToast('<span class="text-success">Order Status</span>','Updated Order Status Successfully!');
            // getUserOrders();

        }else{
            showToast('<span class="text-danger">Error</span>',result?.message);
           
        }
    }catch(err){
        console.log(err);
        showToast('<span class="text-danger">Error</span>',err);
       
    }
        
    }
    
    getUserOrders();
    