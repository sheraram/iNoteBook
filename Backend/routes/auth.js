const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); // password hash and add salt
// Authentication 
var jwt =require('jsonwebtoken');
var JWT_SECRET = 'Shera@code@krega';
var fetchuser = require('../middlewares/fetchuser')



//Route : 1 Create a user using : POST "/api/auth/createUser" Doesn't require auth No need to login
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
            res.send(authtoken);
            console.log("auth done");
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    }
)

//Route:2 Login/Authenticate a user using : POST "/api/auth/login" Doesn't require auth No need to login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()],
    async (req, res) => {
        // If there are error, retuen  bad request and error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Check whether user with email exist already
        try {
            // check user exist or not
            let user = await User.findOne({ email: req.body.email })
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials" })
            }

            // using destucturing method to pull out email, password from body
            const {email,password}=req.body;

            // password compare
            const passcompare=await bcrypt.compare(password,user.password);
            if(!passcompare){
                return res.status(400).json({error: "Please try to login with correct credentials"})
            }
            // Authentication 
            const data={
                user:{
                    id: user.id
                }
            }
            const authtoken=jwt.sign(data,JWT_SECRET);
            res.json(authtoken); // send payload(authtoken) to user
            console.log("auth done");
            
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    }
)

//Route:3 Get loggedin user Details using : POST "/api/auth/getuser" require to login
router.post('/getUser', fetchuser ,async (req, res) => {
        try {
            userId=req.user.id;
            const user = await User.findById(userId).select("-password"); // get user details without password
            res.send(user);
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    }
)


module.exports = router


