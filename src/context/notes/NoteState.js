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
    return (
        // passing notes and setNotes to other component using provider
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState