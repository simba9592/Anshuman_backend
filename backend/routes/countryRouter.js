const router = require("express").Router();

const {
  createCountries, getCountries
} = require("../controllers/countryController")

router.route("/create").post(createCountries);
router.route("/").get(getCountries)

module.exports = router;