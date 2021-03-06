var express = require('express');
var router = express.Router();
const PublicController = require("../controllers/ModController");

router.get("/questions",PublicController.getUnlive);
router.post("/questions",PublicController.makePublic);
router.delete("/questions",PublicController.deleteQuestion);
router.post("/questions/category",PublicController.addCategory);
router.get("/getauto",PublicController.getAuto);
router.get("/setauto",PublicController.setAuto);
module.exports = router;
