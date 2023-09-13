const userGreetEl = document.getElementById('userGreetInfo');
const adminRoutes = ['/admin-dashboard.html','/admin-orders.html','/food-items.html']
function setUserGreetMsg(){
    const user = JSON.parse(localStorage.getItem('user'));
    userGreetEl.innerHTML = `Hello, ${user?.fname + ' ' + user?.lname}`

}

setUserGreetMsg();

function setUserDetails(){
    let userDashboardWrapper = document.getElementById('userDashboardCardWrapper');
    const user = JSON.parse(localStorage.getItem('user'));
    let html = `
        <div class="card p-3 shadow-sm">
            <img src="./assets/user.png" style="width:200px;" class="d-block mx-auto" alt="userIcon"/>
            <hr/>
            <table class="table table-bordered">
                <tr>
                    <th>UserId</th>
                    <td>#${user?.id}</td>
                </tr>
                <tr>
                    <th>First Name</th>
                    <td>${user?.fname}</td>
                </tr>
                <tr>
                <th>Last Name</th>
                <td>${user?.lname}</td>
                </tr>

                <tr>
                <th>Email</th>
                <td>${user?.email}</td>
                </tr>

                 
                <tr>
                <th>Username</th>
                <td>${user?.username}</td>
                </tr>

            </table>
        </div>
    
    `
    userDashboardWrapper.innerHTML = html;

}


if(window.location.pathname ==='/admin-dashboard.html' || window.location.pathname ==='/user-dashboard.html'){
    setUserDetails();
}

function toggleDashboardMenu(){
    const toggleDashboardMenu = document.getElementById('dashboardMenu');
   
   if(toggleDashboardMenu.classList.contains('hideDashboard')){
    toggleDashboardMenu.classList.remove('hideDashboard')
   }else{
    toggleDashboardMenu.classList.add('hideDashboard')
   }

}


window.addEventListener('resize',()=>{
    const toggleDashboardMenu = document.getElementById('dashboardMenu');
    if(window.outerWidth <975) {
        toggleDashboardMenu.classList.add('hideDashboard')
    }
});


if(adminRoutes.includes(window.location.pathname)){
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.roles==='ROLE_ADMIN'){
    //    console.log('.');
    }else{
        window.location.pathname='/index.html'
    }
}