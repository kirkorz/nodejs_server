var express = require('express');
var router = express.Router();
const PublicController = require("../controllers/ModController");

router.get("/questions",PublicController.notcheck);
router.post("/questions",PublicController.makePublic);
router.delete("/questions",PublicController.deleteQuestion);

module.exports = router;
