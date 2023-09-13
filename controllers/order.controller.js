const Orders = require("../models/order.model");





exports.createNewOrder = async (req,res)=>{
    let data = req.body;
    console.log(data);

    try{
        const order =  new Orders(data);
        const result = await order.save();
        console.log(result);
        res.send(result);
    }catch(err){
        console.log(err);
        res.status(400).send({message:err.message})
    }


}


exports.getAllOrders = async (req,res)=>{
    try{
        const result = await Orders.find({}).populate('User');
        console.log(result);
        res.send(result);
    }catch(err){
        console.log(err);
        res.status(400).send({message:err.message})
    }

}


exports.getUserOrders = async (req,res)=>{
    try{
        const userId = req.params.id;
        const result = await Orders.find({User:userId});
        console.log(result);
        res.send(result);
    }catch(err){
        console.log(err);
        res.status(400).send({message:err.message})
    }

}

exports.updateOrder = async (req,res)=>{
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const result = await Orders.findByIdAndUpdate(id,{$set:updatedData},{returnOriginal:false});
        console.log(result);
        res.send(result);
    }catch(err){
        console.log(err);
        res.status(400).send({message:err.message})
    }
}
