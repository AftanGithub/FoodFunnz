const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    title:String,
    description:String,
    imageLink:String,
    category:{
        type: String,
        enum: ['Breakfast', 'Lunch','Dinner']
      },
    price:Number,
    foodType:String
   
  },{
      timestamps:true
    })
const Foods = mongoose.model('Foods',FoodSchema);
module.exports = Foods;
