const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


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
            console.log(user)
            console.log("HIHIHHHIIHIIHIIIH")
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exist" })
            }
            // Create user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            console.log(req.body);
            res.send(user);
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json("Some error occured");
        }
    }
)

module.exports = router


