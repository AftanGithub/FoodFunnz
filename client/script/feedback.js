const feedbackCardWrapper = document.getElementById('feedback__cardWrapper');


async function getAllFeedback(){
    try{
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(SERVER_URI+'api/feedback/get-all-feedback',{
            method:'GET',
            headers: {
                'x-access-token':user?.token
              },
        });
        const result = await response.json();
        if(response.status===200){
            console.log(result);
            feedbackCardWrapper.innerHTML = '';
            result.forEach((item)=>{
                
                let html = `
                <div class="card p-3 m-3 mb-4">
                    
                    <div class="d-flex justify-content-between align-items-center">
                        <h3 class="card-title">${item?.user?.fname ? item?.user?.fname : item?.user?.username}</h3>
                        <div class="text-secondary">
                        ${item?.user?.email}
                        </div>  
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                    <div class="text-secondary">Submitted on: ${item?.createdAt}</div>
                    <div class="badge bg-warning">
                            ${item?.rating}
                        </div>
                   
                     </div>
                <hr/>
                <div class="text-sm">
                    ${item?.suggestion}
                </div>
                </div>
                
                `
                feedbackCardWrapper.insertAdjacentHTML('beforeend',html);
            })
        }
    }catch(err){
        console.log(err);
        showToast('<span class="text-danger">Error</span>',err);
    }
}


getAllFeedback();