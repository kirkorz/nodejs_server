var express = require('express');
var router = express.Router();
const QuestionsController = require("../controllers/QuestionsController");
const AuthMiddleWare = require("../middleware/auth")


router.get("/questions/public/:questionsId",QuestionsController.getQuestionsbyId);
router.get("/questions/",QuestionsController.getQuestionsall);
router.use(AuthMiddleWare.isAuth);
router.get("/questions/private",QuestionsController.getQuestions);
router.post("/questions",QuestionsController.postQuestions);
router.delete("/questions/:questionsId",QuestionsController.deleteQuestions);
router.put("/questions/:questionsId",QuestionsController.putQuestions);
/* GET home page. */
// router.post('/login', function(req, res, next) {
//     console.log('done')
//     res.status(200).send({'data':'ok'})
// });
  
module.exports = router;
  