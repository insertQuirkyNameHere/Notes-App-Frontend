import React from 'react'

const Note = ({note, toggleImportance}) => {

    return(
        <li key={note.id} className="note">

            {note.content}

            <button onClick={toggleImportance}>
                {note.important ? 'Mark Unimportant' : 'Mark Important'}
            </button>
        </li>
    );
};

export default Note;