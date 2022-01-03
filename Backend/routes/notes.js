const express = require('express');
const fetchuser = require('../middlewares/fetchuser');
const router = express.Router();
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator');
// var fetchallnotes = require('../models/Notes')


//Route:1 Get All notes using : GET "/api/notes/fetchallnotes" require to login
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes)
})

//Route : 2 Create a note using : POST "/api/notes/addnote"  require need to login
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

//Route : 3 Update a note using : PUT "/api/notes/updatenote"  require need to login
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {


        const { title, description, tag } = req.body;
        // Create a new note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        // Getting the notes with the help of findbyId method
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("User not found") }

        // Validating the User  && note.user.toString() give id of note
        // Matching the existing user id with the logged in user id
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Update the note data using the findByIDAndUpdate method
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

////Route : 4 Delete a note using : DELETE "/api/notes/deletenote"  require login
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("User not found") }

        // Allow deletion if user own this note
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed"); }
        // Delete note using findByIdAndDelete method
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router