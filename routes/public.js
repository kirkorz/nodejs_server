var express = require('express');
var router = express.Router();
const QuestionsController = require("../controllers/QuestionsController");
const AnswersController = require("../controllers/AnswersController");


router.get("/answers/",AnswersController.getAnswers); 
router.get("/questions/all",QuestionsController.getQuestions_all);
router.get("/questions/search",QuestionsController.searchQuestions);
router.get("/questions/:questionsId",QuestionsController.getQuestions_Id);

module.exports = router;
