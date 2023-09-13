const authConfig = require("../config/auth.config");
const bcrypt = require('bcryptjs');
const db = require('../models');
const Role = db.role;
const Users = db.user;
const jwt = require('jsonwebtoken');




exports.signup = async (req,res)=>{
    console.log(req.body);
    try{
        const userRole = await Role.findOne ({name: 'user'});
        const data = req.body;
        console.log(userRole);
        data.roles = [userRole._id];
        data.password = bcrypt.hashSync (data.password, 8);
        console.log(data);
        const user = new Users(data);
        const result = await user.save();
        console.log(result);
        res.send({messsage:'User Registered successfully!'});

    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}

exports.signin = async (req,res)=>{
    console.log(req.body);
    try{
        const user = await Users.findOne({email:req.body.email}).populate ('roles', '-__v');
        if(user){
            let passwordIsValid = bcrypt.compareSync (
                req.body.password,
                user.password
              );

            //   console.log(passwordIsValid);
            //   console.log(req.body.password);
            //   console.log(user.password);
        if (!passwordIsValid) {
            return res.status (401).send ({
              accessToken: null,
              message: 'Invalid Password!',
            });
          }

          let token = jwt.sign ({id: user.id}, authConfig.secret);
          console.log (user.roles);
          let authorities = [];
  
          for (let i = 0; i < user.roles.length; i++) {
            authorities.push ('ROLE_' + user.roles[i].name.toUpperCase ());
          }

          res.send({
            id:user._id,
            fname:user.fname,
            lname:user.lname,
            email:user.email,
            username:user.username,
            token:token,
            roles:authorities[0]
          })
      
        }else{
            res.status(400).send({message:'User not found!'});
        }
    }catch(err){
        console.log(err);
        res.status(400).send({message:err.message});
    }
}