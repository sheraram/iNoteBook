const express = require('express');
const fetchuser = require('../middlewares/fetchuser');
const router = express.Router();
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator');
// var fetchallnotes = require('../models/Notes')


//Route:1 Get All notes using : GET "/api/routes/fetchallnotes" require to login
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes)
})

//Route : 2 Create a note using : POST "/api/routes/addnote"  require need to login
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 4 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })],
    async (req, res) => {
        try {
            // using destucturing method of javascript to pull out data from body
            const { title, description, tag } = req.body;
            // If there are error, retuen  bad request and error
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({ title, description, tag, user: req.user.id }) // New note object contains a title, des.,tag and user
            const saveNote = await note.save()  // saving note

            res.json(saveNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    }
)

module.exports = router