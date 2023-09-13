const {authJwt} = require ('../middlewares');
const controller = require('../controllers/feedback.controller');



module.exports = (app)=>{



    app.post (
        '/api/feedback/create-new-feedback',
        [
          authJwt.verifyToken,
        ],
        controller.createNewFeedback
      );


    app.get( '/api/feedback/get-all-feedback',
    [
        authJwt.verifyToken,
        authJwt.isAdmin
      ],
    controller.getAllFeedback)  

    
}