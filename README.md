# FoodFunnz
This is a restaurant application which has features such as user authentication, Food Items management, orders management, File Upload, Stripe Payment Gateway etc. It is a full stack application with HTML, CSS and Javascript in the frontend and Nodejs and MongoDB in the backend.


Project Development – A Restaurant Management System 

**Project Structure** 

The project is built with frontend with (HTML,CSS,JS) and the backend is built with Nodejs, Expressjs, MongoDB, Mongoose, stripe etc. 

The folder structure looks like below: 


![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 001](https://github.com/AftanGithub/FoodFunnz/assets/75898512/10ba7ce0-6f66-4c77-9e8d-e1ab7141d837)

Folder Explanation: 

1. **Client** – This folder contains all the client side code for our website like html pages, css styles, assets for images, javascript files for client side logic. 
1. **Config** – This folder contains the configuration contains a configuration file for jwt tokens for authentication. This contains the expiration time of a token. JWT secret key etc. 
1. **Controllers** – this folder contains the files for controller or handler functions that will be used on backend for different routes handling.** 
1. **Middlewares**—This folder contains the middleware functions to verify tokens from frontend to verify user is loggedin while accessing a particular route, role of the user for a particular route ( like isAdmin for admin routes).**  
1. **Models**—This folder contains all the database schema files that defines the structure of  a document in mongodb database.** 
1. **Node\_modules** – This folder contains all our backend packages or libraries files which are used in the project.** 
1. **Routes**—this folder contains the route related files for user to  make request** 
1. **Uploads** – the folder will store the files which will be uploaded from the frontend by user.** 
1. **Server.js** – This is the main server file for starting the server, managing route files and database initialization.** 
10. **Package**.json files – These files contains the information about the packages or dependencies which are installed in the backend project.**

**Screenshots**

![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 028](https://github.com/AftanGithub/FoodFunnz/assets/75898512/7edcd522-3554-45fc-b4bb-a6b1100e8933)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 027](https://github.com/AftanGithub/FoodFunnz/assets/75898512/0605d9d5-8c43-49ee-9919-fac617b2d86c)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 026](https://github.com/AftanGithub/FoodFunnz/assets/75898512/e0512896-8d28-4deb-8f64-8c35b0205fde)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 025](https://github.com/AftanGithub/FoodFunnz/assets/75898512/a865bd7a-707e-4267-bdc8-b3fdbba1aed9)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 024](https://github.com/AftanGithub/FoodFunnz/assets/75898512/357f0eaa-dd94-43a5-82b9-7b7d61959854)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 023](https://github.com/AftanGithub/FoodFunnz/assets/75898512/8c33df38-37e2-48fd-8d08-4c91fab74796)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 022](https://github.com/AftanGithub/FoodFunnz/assets/75898512/3e680fca-387b-41cc-a069-0cb5cedef1d9)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 021](https://github.com/AftanGithub/FoodFunnz/assets/75898512/c9b73e2e-371f-4cd1-9fcf-a68d215a8d4a)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 020](https://github.com/AftanGithub/FoodFunnz/assets/75898512/1acce344-208e-4301-a5ce-12a9ab069cea)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 019](https://github.com/AftanGithub/FoodFunnz/assets/75898512/8205c3c5-cc05-4be7-8e13-c9eff401a252)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 018](https://github.com/AftanGithub/FoodFunnz/assets/75898512/91390f35-35bd-4d11-a148-a6df790fb94a)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 017](https://github.com/AftanGithub/FoodFunnz/assets/75898512/cfbbade3-938b-4d68-9cb4-631cd9102021)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 016](https://github.com/AftanGithub/FoodFunnz/assets/75898512/3614843b-d131-4ea8-9897-fa9ec9923d34)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 015](https://github.com/AftanGithub/FoodFunnz/assets/75898512/086a2c2b-76ac-40ce-8d35-81d61536feb9)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 014](https://github.com/AftanGithub/FoodFunnz/assets/75898512/d8a2ed01-8765-4bef-a589-05896bc0685a)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 013](https://github.com/AftanGithub/FoodFunnz/assets/75898512/29841d6c-f4fb-4c1a-9179-f0ac12f90f24)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 012](https://github.com/AftanGithub/FoodFunnz/assets/75898512/191f6456-5b25-44e4-b0b2-fac7833cdac6)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 011](https://github.com/AftanGithub/FoodFunnz/assets/75898512/82f2128b-c9b4-4d14-97b0-1affe1088d4e)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 010](https://github.com/AftanGithub/FoodFunnz/assets/75898512/fd64c34c-ad5a-494f-bac9-313c5c5d6a33)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 009](https://github.com/AftanGithub/FoodFunnz/assets/75898512/d0209df7-59ad-46bd-9490-e8b1e7e42e63)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 008](https://github.com/AftanGithub/FoodFunnz/assets/75898512/71000354-b1df-48f5-b3ba-5128f5b147c8)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 007](https://github.com/AftanGithub/FoodFunnz/assets/75898512/e6216de2-6b86-41c5-9df4-a1e20f46cf6f)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 006](https://github.com/AftanGithub/FoodFunnz/assets/75898512/561f369b-e635-4bca-aed9-677bf8d2f855)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 005](https://github.com/AftanGithub/FoodFunnz/assets/75898512/4569dea6-16d0-448c-8d72-d6588ad777ba)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 004](https://github.com/AftanGithub/FoodFunnz/assets/75898512/c6bb1118-c4aa-4f59-a2b3-49092e444011)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 003](https://github.com/AftanGithub/FoodFunnz/assets/75898512/9064a5f7-6086-4ce5-a857-f6d8d0cb5a91)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 002](https://github.com/AftanGithub/FoodFunnz/assets/75898512/fbffd732-80d5-40d2-8119-a3be050b3c33)
![Aspose Words db8cf26b-574a-4339-90a2-bb63115d8d91 030](https://github.com/AftanGithub/FoodFunnz/assets/75898512/beab8128-2713-4df5-8bfa-3a595a9db7b0)


