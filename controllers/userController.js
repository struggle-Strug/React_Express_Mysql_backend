const { where } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models").User;

exports.signup = async (req, res) => {
    const prevUser = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(prevUser){
        res.status(400).json({message: "Already Registered"});
    } else {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(req.body.password, salt);
        const newUser = {
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            password: password
        };

        User.create(newUser)
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message:
                      err.message || "Some error occurred while creating the Tutorial."
                  });
            })
    }
}

exports.signin = async (req, res) => {
    const existUser = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!existUser){
        res.status(400).json({message: "You are not registered"});
    }
    const isMatch = await bcrypt.compare(req.body.password, existUser.password);
    if(!isMatch){
        res.status(400).json({message: "Password is incorrect"});
    }
    const payload = {
        id: existUser._id,
        email: existUser.email
    }
    jwt.sign(payload, "secret", { expiresIn: 3600}, (err, token) => {
        if (err) throw err;
        else {
          res.status(200).json({
            message: "Login Success!",
            token: `Bearer ${token}`,
            user: existUser,
          });
        }
    });
}