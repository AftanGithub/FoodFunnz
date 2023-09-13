const Foods = require("../models/food.model");
const fs = require('fs');

exports.createNewFood = async (req,res)=>{
    let data = req.body;
    console.log(data);

    try{
        const food =  new Foods(data);
        const result = await food.save();
        console.log(result);
        res.send(result);
    }catch(err){
        console.log(err);
        res.status(400).send({message:err.message})
    }


}


exports.getAllFoods = async (req,res)=>{
    try{
        const result = await Foods.find({});
        console.log(result);
        res.send(result);
    }catch(err){
        console.log(err);
        res.status(400).send({message:err.message})
    }

}


exports.deleteFood = async (req,res)=>{
    try{
        console.log(req.body);
        const id = req.body.id;
        console.log(id);
        const result = await Foods.findById(id);
        console.log(result);
        if(result.imageLink){
            fs.unlink(result.imageLink,async function (err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
                console.log('File deleted!');
                let result2 = await Foods.findByIdAndDelete(id);
                res.send(result2);
         });
        }
       

        
       
    }catch(err){
        console.log(err);
        res.status(400).send({message:err.message})
    }

}


exports.getSingleFood = async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await Foods.findById(id);
        console.log(result);
        res.send(result);
    }catch(err){
        console.log(err);
        res.status(400).send({message:err.message})
    }

}


exports.updateFood = async (req,res)=>{
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const food = await Foods.findById(id);
        if(food.imageLink !==updatedData.imageLink){
            fs.unlink(food.imageLink, function (err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
                console.log('File deleted!');
         });
        } 
        const result = await Foods.findByIdAndUpdate(id,{$set:updatedData},{returnOriginal:false});
        console.log(result);
        res.send(result);
    }catch(err){
        console.log(err);
        res.status(400).send({message:err.message})
    }
}