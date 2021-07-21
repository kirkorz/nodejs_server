var express = require('express');
var router = express.Router();
const QuestionsController = require("../controllers/QuestionsController");

router.get("/private",QuestionsController.getQuestions_user);
router.post("/",QuestionsController.postQuestions);
router.delete("/:questionsId",QuestionsController.deleteQuestions);
// pub
router.get("/all",QuestionsController.getQuestions_all);
router.get("/search",QuestionsController.searchQuestions);
router.get("/tags",QuestionsController.searchQuestionsbytags)
router.get("/:questionsId",QuestionsController.getQuestions_Id);

// router.put("/questions/:questionsId",QuestionsController.putQuestions);

module.exports = router;
  