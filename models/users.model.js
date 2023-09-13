const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    fname:String,
    lname:String,
    username:String,
    phoneNumber:Number,
    password:String,
    email:String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
  },{
      timestamps:true
    })
const Users = mongoose.models.Users || mongoose.model('Users',UsersSchema);
module.exports = Users;
