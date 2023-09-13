 

async function handleRegister(){
   
    try{
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if(!email || !password || !username){
            showToast('<span class="text-danger">Error</span>','Email, Password and Username are required!');
            return;
        }
        if(!emailRegex.test(email)){
            showToast('<span class="text-danger">Email Error</span>','Please Enter a Valid Email!');
            return;
        } 
        if(!passwordRegex.test(password)){
            showToast('<span class="text-danger">Password Error</span>','Please Enter a Password between 6-16 characters with numbers,text and special characters!');
            return;
        }
        let data = {
            fname,
            lname,
            username,
            email,
            password
        }
        // console.log(data);
        const response = await fetch(SERVER_URI+'api/auth/signup',{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result);
        if(response.status===200){
          
            showToast('<span class="text-success">Register Status</span>','User Registered Successfully!','/login.html');
        }else{
            showToast('<span class="text-danger">Error</span>',result?.message);
        }
    }catch(err){
        console.log(err);
        showToast('<span class="text-danger">Error</span>',err);
    }
   



}