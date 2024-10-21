const Assumption = require("../models/assumptionModel")

exports.createAssumptions = async (req, res) => {
  try {
    const assumptions = req.body;
    for (let assumption of assumptions) {
      const existingAssumption = await Assumption.findOne({fieldName: assumption.fieldName});
      if (!existingAssumption) {
        const newAssumption = new Assumption({
          fieldName: assumption.fieldName, 
          variable: assumption.variable
        })
        await newAssumption.save()
      } else {
        await Assumption.findOneAndUpdate({fieldName: assumption.fieldName}, assumption, {new: true})
      }
    }
    res.status(200).send({msg: "Data is successfully stored!"})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAssumptions = async (req, res) => {
  try {
    const existingAssumption = await Assumption.find()
    res.status(200).send(existingAssumption)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}