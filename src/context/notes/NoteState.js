import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
    const initialnotes = [
        {
            "_id": "61d22e65b163e79dc3e35eab",
            "user": "61d1388f2163cc38688fcfb6",
            "title": "New updated title",
            "description": "Description is updated",
            "tag": "personal",
            "date": "2022-01-02T22:59:49.637Z",
            "__v": 0
        },
        {
            "_id": "61d24bdd8749f3447182a98892",
            "user": "61d1388f2163cc38688fcfb6",
            "title": "Dass course",
            "description": "Be serious its for future",
            "tag": "B.tech",
            "date": "2022-01-03T01:05:33.385Z",
            "__v": 0
        },
        {
            "_id": "61d24bf649f323447182a98894",
            "user": "61d1388f2163cc38688fcfb6",
            "title": "ML course",
            "description": "Future possiblities",
            "tag": "B.tech",
            "date": "2022-01-03T01:05:58.836Z",
            "__v": 0
        },
        {
            "_id": "61d22e65b1635e79dc3e35eab",
            "user": "61d1388f2163cc38688fcfb6",
            "title": "New updated title",
            "description": "Description is updated",
            "tag": "personal",
            "date": "2022-01-02T22:59:49.637Z",
            "__v": 0
        },
        {
            "_id": "61d24bdd49f344547182a98892",
            "user": "61d1388f2163cc38688fcfb6",
            "title": "Dass course",
            "description": "Be serious its for future",
            "tag": "B.tech",
            "date": "2022-01-03T01:05:33.385Z",
            "__v": 0
        },
        {
            "_id": "61d24bf64349f3447182a98894",
            "user": "61d1388f2163cc38688fcfb6",
            "title": "ML course",
            "description": "Future possiblities",
            "tag": "B.tech",
            "date": "2022-01-03T01:05:58.836Z",
            "__v": 0
        },
        {
            "_id": "61d22e65b13263e79dc3e35eab",
            "user": "61d1388f2163cc38688fcfb6",
            "title": "New updated title",
            "description": "Description is updated",
            "tag": "personal",
            "date": "2022-01-02T22:59:49.637Z",
            "__v": 0
        },
        {
            "_id": "61d24bdd492f3447182a98892",
            "user": "61d1388f2163cc38688fcfb6",
            "title": "Dass course",
            "description": "Be serious its for future",
            "tag": "B.tech",
            "date": "2022-01-03T01:05:33.385Z",
            "__v": 0
        },
        {
            "_id": "61d24bf649f34437182a98894",
            "user": "61d1388f2163cc38688fcfb6",
            "title": "ML course",
            "description": "Future possiblities",
            "tag": "B.tech",
            "date": "2022-01-03T01:05:58.836Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(initialnotes);

    // Add a note
    const addNote = (title, description, tag) => {
        // ToDo Api Call
        console.log("Adding a new note");
        const note = {
            "_id": "61d24bf649f34437182a98894",
            "user": "61d1388f2163cc38688fcfb6",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-01-03T01:05:58.836Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = (id) => {
        // ToDo Api Call
        console.log("Deleting note with id " + id);
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }

    // Edit a note
    const editNote = (id, title, description, tag) => {
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    return (
        // passing notes and setNotes to other component using provider
        <NoteContext.Provider value={{ notes, addNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState