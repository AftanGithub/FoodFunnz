const Feedbacks = require("../models/feedback.model");



exports.createNewFeedback = async (req,res)=>{
    let data = req.body;
    console.log(data);

    try{
        const order =  new Feedbacks(data);
        const result = await order.save();
        console.log(result);
        res.send(result);
    }catch(err){
        console.log(err);
        res.status(400).send({message:err.message})
    }


}


exports.getAllFeedback = async (req,res)=>{
    try{
        const result = await Feedbacks.find({}).populate('user');
        console.log(result);
        res.send(result);
    }catch(err){
        console.log(err);
        res.status(400).send({message:err.message})
    }

}