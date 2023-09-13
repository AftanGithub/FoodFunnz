const {authJwt} = require ('../middlewares');
const controller = require('../controllers/food.controller');
const multer = require('multer');
const path = require('path');

const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: 'uploads', 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() 
           + path.extname(file.originalname))
          // file.fieldname is name of the field (image)
          // path.extname get the uploaded file extension
  }
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a Image with png/jpg extension'))
     }
   cb(undefined, true)
}
}) 


module.exports = (app)=>{

    app.post('/api/uploadImage', imageUpload.single('file'), (req, res) => {
      console.log(req.file);
      res.send(req.file);
 }, (error, req, res, next) => {
    console.log(error);
      res.status(400).send({ error: error.message })
 });

    app.post (
        '/api/food/create-new-food',
        [
          authJwt.verifyToken,
          authJwt.isAdmin
        ],
        controller.createNewFood
      );

      app.post (
        '/api/food/delete-food',
        [
          authJwt.verifyToken,
          authJwt.isAdmin
        ],
        controller.deleteFood
      ); 

    app.get( '/api/food/get-all-food',
    controller.getAllFoods)  
    app.get( '/api/food/get-single-food/:id',
    controller.getSingleFood);

    app.post('/api/food/update-food/:id',[
      authJwt.verifyToken,
      authJwt.isAdmin
    ],
    controller.updateFood)
    
}