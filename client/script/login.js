function handleTogglePassword(){
    const pswrdInput = document.getElementById('password');
    const pswrdAddon = document.getElementById('password-addon');

    if(pswrdInput.getAttribute('type')==='password'){
        pswrdInput.setAttribute('type','text');
        pswrdAddon.innerHTML = `<i class="fa-regular fa-eye"></i>`;
    }else{
        pswrdInput.setAttribute('type','password');
        pswrdAddon.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
    }

}


async function handleLogin(){

    try{
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        let data = {
            email,
            password
        }
        // console.log(data);
        const response = await fetch(SERVER_URI+'api/auth/signin',{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        // console.log(result);
        if(response.status===200){
            localStorage.setItem('user',JSON.stringify(result));
            if(result.roles==='ROLE_ADMIN'){
                showToast('<span class="text-success">Login Status</span>','Logged in Successfully!','/admin-dashboard.html');
            }else{
                showToast('<span class="text-success">Login Status</span>','Logged in Successfully!','/user-dashboard.html');
            }
            
        }else{
            showToast('<span class="text-danger">Error</span>',result?.message);
        }
    }catch(err){
        console.log(err);
        // alert(err);
        showToast('<span class="text-danger">Error</span>',err);
    }
   
}