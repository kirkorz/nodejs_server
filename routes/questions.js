var express = require('express');
var router = express.Router();
const QuestionsController = require("../controllers/QuestionsController");
const AuthMiddleWare = require("../middleware/auth")



router.use(AuthMiddleWare.isAuth);
router.get("/questions",QuestionsController.getQuestions);
router.post("/questions",QuestionsController.postQuestions);
/* GET home page. */
// router.post('/login', function(req, res, next) {
//     console.log('done')
//     res.status(200).send({'data':'ok'})
// });
  
module.exports = router;
  