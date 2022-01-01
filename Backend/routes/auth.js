const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); // password hash and add salt

// Authentication 
var jwt =require('jsonwebtoken');
var JWT_SECRET = 'Shera@code@krega';



// Create a user using : POST "/api/auth/createUser" Doesn't require auth No need to login
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 4 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })],
    async (req, res) => {
        // If there are error, retuen  bad request and error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Check whether user with email exist already
        try {

            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exist" })
            }
            // Password hashing and added salt
            const salt = await bcrypt.genSaltSync(10);
            const secpass= await bcrypt.hash(req.body.password, salt);
            // Create user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secpass
            })

            // Authentication 
            const data={
                user:{
                    id: user.id
                }
            }
            const authtoken=jwt.sign(data,JWT_SECRET);
            console.log(authtoken);
            res.send(authtoken);
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json("Some error occured");
        }
    }
)

module.exports = router


