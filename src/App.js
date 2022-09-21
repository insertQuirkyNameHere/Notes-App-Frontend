import {useState, useEffect} from 'react'

import Note from './components/Note'
import Notification from './components/Notification'

import noteServices from './services/notes'

import './css/index.css'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [error, setError] = useState(null);

  useEffect( () => {
    noteServices
      .getAll()
      .then( response => setNotes(response) );
  }, [])


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);

  console.log(`notesToShow at creation:`, notesToShow);

  const addNote = (e) => {
    e.preventDefault();

    const newNoteObj = {  
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    noteServices
      .create(newNoteObj)
      .then( response =>{
        setNotes(notes.concat(response));
        setNewNote('');
    });
  
  };

  const handleInputChange = (e) =>{
    setNewNote(e.target.value);
  };

  const toggleImportanceof= (id)=> {
    
    const noteToChange = notes.find(note => note.id===id);
    const changedNote = {...noteToChange, important:!noteToChange.important};
    
    console.log(`noteToChange: ${JSON.stringify(noteToChange)}`);
    console.log(`Changed Node: ${JSON.stringify(changedNote)}`);

    noteServices
      .update(id, changedNote)
      .then( response => {
        setNotes(notes.filter(note => note.id !== id).concat(response));
      })
      .catch(error => {
        setError(`Note '${noteToChange.content}' was already removed from server!`);
        setTimeout( () => setError(null), 5000);
        setNotes(notes.filter(note => note.id !== id));
      });
  }

  console.log(notesToShow);

  return(
    <>
      <h1>Notes</h1>
      <Notification message={error} />
      {notesToShow.map(note => <Note note={note} key={note.id} toggleImportance={() => toggleImportanceof(note.id)}/>)}
      <div>
        <button onClick={() => setShowAll(!showAll)}>{showAll? 'Only important': 'Show all'}</button>
      </div>
      <form onSubmit={addNote}>
        <input type="text" onChange={handleInputChange} value={newNote}></input>
        <button type="submit">Add note</button>
      </form>
    </>
  )
};


export default App;
