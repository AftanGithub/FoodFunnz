const {authJwt} = require ('../middlewares');
const controller = require('../controllers/order.controller');
const Foods = require('../models/food.model');
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);




async function calculateAmount(cartData){
    let finalAmount = 0;
    try{
        for(let i=0;i<cartData.length;i++){
            let item = cartData[i];
            const food = await Foods.findById(item.id);
            finalAmount += food.price;
        }
        return finalAmount;
    }catch(err){
        console.log(err);
    }
}



module.exports = (app)=>{



    app.post('/api/payments/create-payment-intent',async (req,res)=>{
        console.log(req.body);
        
        
        const {items} = req.body;
        const amount = await calculateAmount(items);
        console.log(amount);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            description:"Food & Funzz Order Payment",
            automatic_payment_methods: {
                enabled: true,
              }
          });
        
          res.send({
            clientSecret: paymentIntent.client_secret,
          });
    })


    app.post (
        '/api/orders/create-new-order',
        [
          authJwt.verifyToken
        ],
        controller.createNewOrder
      );


    app.get( '/api/orders/get-all-orders',[
        authJwt.verifyToken,
        authJwt.isAdmin
      ],
    controller.getAllOrders);

    app.get( '/api/orders/get-user-orders/:id',[
        authJwt.verifyToken
      ],
    controller.getUserOrders);

    app.post('/api/orders/update-order/:id',[
      authJwt.verifyToken,
      authJwt.isAdmin
    ],
    controller.updateOrder)
    
}