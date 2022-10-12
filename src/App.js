import { useState, useEffect } from 'react';
import Split from 'react-split';
import Sidebar from './components/siderBar';
import Editor from './components/editor';
import { nanoid } from 'nanoid'
import './App.css';

function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem('notes')) || []
  );
  const [currentNoteId, setCurrentNoteId] = useState(notes[0] || '');

  useEffect(() => localStorage.setItem('notes', JSON.stringify(notes)), [notes])

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
    setNotes(preNotes => [...preNotes, newNote])
    setCurrentNoteId(newNote.id)
  }

  const updateNote = (text) => {
    const newArray = [];
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === currentNoteId) {
        newArray.unshift({ ...notes[i], body: text })
      } else {
        newArray.push(notes[i])
      }
      setNotes(newArray)
    }
  }

  const deleteNote = () => setNotes(prevs => prevs.filter(prev => prev.id !== currentNoteId))

  const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]

  return (
    <main>
      {notes.length > 0
        ?
        <Split sizes={[30, 70]}
          direction="horizontal"
          className='split'>
          <Sidebar createNewNote={createNewNote} setCurrentNoteId={setCurrentNoteId} notes={notes} currentNote={currentNote} deleteNote={deleteNote} />
          <Editor updateNote={updateNote} currentNote={currentNote} />
        </Split>
        :
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button
            className="first-note"
            onClick={createNewNote}
          >
            Create one now
          </button>
        </div>}

    </main>
  );
}

export default App;
