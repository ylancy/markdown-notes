const Sidebar = ({ createNewNote, setCurrentNoteId, notes, currentNote, deleteNote }) => {
    const elements = notes.map((note, idx) => (
        <div key={idx}
            className={`title ${note.id === currentNote.id ? 'selected-note' : ''}`}
            onClick={() => setCurrentNoteId(note.id)} >
            <h4 className="text-snippet">{note.body.split('\n')[0]}</h4>
            <button onClick={deleteNote}>
                <i className="gg-trash icon-trash"></i>
            </button>
        </div >
    ))

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>Notes</h3>
                <button className="new-note" onClick={createNewNote}>+</button>
            </div>
            {elements}
        </div>

    )
}


export default Sidebar;