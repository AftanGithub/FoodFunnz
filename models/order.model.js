const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    User: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Users',
        },
    paymentDetails:{type:Object},
    status:String,
    foods:Array
  },{
      timestamps:true
    })
const Orders = mongoose.model('Orders',OrderSchema);
module.exports = Orders;
