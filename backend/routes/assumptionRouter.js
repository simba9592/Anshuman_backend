const router = require("express").Router();

const {
  createAssumptions, getAssumptions
} = require("../controllers/assumptionController")

router.route("/create").post(createAssumptions);
router.route("/").get(getAssumptions)

module.exports = router;