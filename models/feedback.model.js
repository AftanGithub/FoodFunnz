const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
    suggestion:String,
    rating:String,
  },{
      timestamps:true
    })
const Feedbacks = mongoose.model('Feedbacks',FeedbackSchema);
module.exports = Feedbacks;
