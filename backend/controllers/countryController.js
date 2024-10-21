const Country = require("../models/countryModel")

exports.createCountries = async (req, res) => {
  try {
    const countries = req.body;
    for (let country of countries) {
      const existingCountry = await Country.findOne({countryName: country.countryName});
      if (!existingCountry) {
        const newCountry = new Country({
          countryName: country.countryName, 
          lcuAbbreviation: country.lcuAbbreviation, 
          locationIndex: country.locationIndex, 
          usdTolcu: country.usdTolcu
        })
        await newCountry.save()
      } else {
        await Country.findOneAndUpdate({countryName: country.countryName}, country, {new: true})
      }
    }
    const existingCountry = await Country.find()
    res.status(200).send({msg: "Data is successfully stored!", countries: existingCountry})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getCountries = async (req, res) => {
  try {
    const existingCountry = await Country.find()
    res.status(200).send(existingCountry)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}