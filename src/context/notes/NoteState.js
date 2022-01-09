import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:4000"
    const initialnotes = []
    const [notes, setNotes] = useState(initialnotes);

    // fetch all notes
    const getNotes = async () => {
        // ApI Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkMTM4OGYyMTYzY2MzODY4OGZjZmI2In0sImlhdCI6MTY0MTEwMTQ1NX0.ujfiU8yjRXE-8j4MbmGQSO-YFn4MwkBVSFchkjN2o9c',
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json()
        // console.log(json)
        setNotes(json);
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        // ApI Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkMTM4OGYyMTYzY2MzODY4OGZjZmI2In0sImlhdCI6MTY0MTEwMTQ1NX0.ujfiU8yjRXE-8j4MbmGQSO-YFn4MwkBVSFchkjN2o9c'
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const note = await response.json()
        setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // Api Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkMTM4OGYyMTYzY2MzODY4OGZjZmI2In0sImlhdCI6MTY0MTEwMTQ1NX0.ujfiU8yjRXE-8j4MbmGQSO-YFn4MwkBVSFchkjN2o9c'
            }
        });
        const json = await response.json()

        // console.log("Deleting note with id " + id);
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // ApI Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkMTM4OGYyMTYzY2MzODY4OGZjZmI2In0sImlhdCI6MTY0MTEwMTQ1NX0.ujfiU8yjRXE-8j4MbmGQSO-YFn4MwkBVSFchkjN2o9c'
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const json = await response.json()
        // console.log(json)

        const newNote = JSON.parse(JSON.stringify(notes))

        // Logic to edit in client
        for (let index = 0; index < newNote.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }

        }
        // console.log(newNote);
        setNotes(newNote);
    }

    return (
        // passing notes and setNotes to other component using provider
        <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;