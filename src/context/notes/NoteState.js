import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
    // Create a new state with name and calss field
    const s1 = {
        "name": "Harry",
        "class": "6d"
    }
    const [state, setState] = useState(s1)
    const update = () => {
        setTimeout(() => {
            setState({
                "name": "john",
                "class": "8d"
            })
        }, 1000);
    }
    return (
        // passing state to all component using provider
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState