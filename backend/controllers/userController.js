const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const keys = require("../config/keys")

exports.register = async (req, res) => {
	try {
		let { email, password, role, name } = req.body;
	
		const existingUser = await User.findOne({ email: email });
		if (existingUser)
			return res
				.status(400)
				.json({ msg: "An account with this email already exists." });
	
		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);
	
		const newUser = new User({
			email: email,
			password: passwordHash,
			name: name,
			role: role,
      createAt: Date.now(),
      updateAt: Date.now(),
      logInAt: Date.now(), 
      currentNumber: 0,
      permittedNumber: 5
		});
		await newUser.save()
		.then((savedUser) => {
			res.status(200).json({newUser: savedUser, msg: "You have registered successfully!"});
		})
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

exports.login = async (req, res) => {
	try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
    
    if (!user.status) {
      return res.status(400).json({ msg: "Please verify your email." })
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." });

    User.findByIdAndUpdate(user._id, {logInAt: Date.now()}, {new: true})
    .then((newUser) => {
      const userInfo = {
        id: newUser._id,
        email: newUser.email, 
        name: newUser.name, 
        role: newUser.role, 
        avatar: newUser.avatar, 
        currentNumber: newUser.currentNumber, 
        permittedNumber: newUser.permittedNumber
      }
      const token = jwt.sign(userInfo, keys.secretOrKey, { expiresIn: '24h' });
      return res.status(200).json({ token, msg: "You have logged in successfully." });
    })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({role: "user"})
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getCurrentUser = async (req, res) => {
  try {
    User.findById(req.user._id)
    .then((user) => {
      let sendData = {
        id: user._id,
        email: user.email, 
        name: user.name, 
        role: user.role, 
        avatar: user.avatar, 
        currentNumber: user.currentNumber, 
        permittedNumber: user.permittedNumber
      }
      res.status(200).send(sendData)
    })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.calculateCount = async (req, res) => {
  try {
    const { email } = req.body;
    await User.findOne({email})
    .then(async (user) => {
      const updatedUser = {
        ...user._doc,
        currentNumber: user.currentNumber ? user.currentNumber + 1 : 1
      };
      await User.findOneAndUpdate({email}, updatedUser, { new: true })
      .then((newUser) => {
        res.status(200).send({currentNumber: newUser.currentNumber})
      }).catch((error) => {
        res.status(500).json({ error: error.message });
      })
    }) 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.updateUserByAdmin = async (req, res) => {
  try {
    let { id, password, permittedNumber } = req.body
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    
    await User.findById(id)
    .then(async (user) => {
      let updateUser = {
        ...user._doc, 
        password: passwordHash, 
        permittedNumber: permittedNumber
      }
      await User.findByIdAndUpdate(id, updateUser, { new: true })
      .then((updateUser) => {
        let sendData = {
          id: updateUser._id,
          permittedNumber:  updateUser.permittedNumber
        }
        res.status(200).send(sendData)
      }).catch((error) => {
        res.status(500).json({ error: error.message });
      })
    }).catch((error) => {
      res.status(500).json({ error: error.message });
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    let { id } = req.body
    User.findByIdAndDelete(id)
    .then((user) => {
      res.status(200).send("User is deleted successfully")
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}