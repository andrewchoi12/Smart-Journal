import { useState, useEffect } from "react"
import api from "../api"
import Note from "../components/Note"
import "../styles/Home.css"
import SentimentCalendar from "../components/Calendar"

function Home() {
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [showNotes, setShowNotes] = useState(false);

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        // Gives all notes user has written
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => { setNotes(data); console.log(data) })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Note Deleted!")
            else alert("Failed to delete note.")
            getNotes()
        }).catch((error) => alert(error))
    }

    const createNote = (e) => {
        e.preventDefault()
        api.post("/api/notes/", {content, title}).then((res) => {
            if (res.status === 201) alert("Note Created!")
            else alert("Failed to make create note.")
            getNotes()
        }).catch((error) => alert(error))
    }

    const toggleNotes = () => {
        setShowNotes(!showNotes);
    };

    return <div>
        <h1 id="top-text">Smart Journal</h1>
        <SentimentCalendar notes={notes}/>
        <h2 id="create-text">Create an Entry for Today</h2>
        <form class="note-form" onSubmit={createNote}>
            <label class ="title" htmlFor="title">Title:</label>
            <input
                type="text" 
                id="title" 
                name="title" 
                required 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label htmlFor="content">Content:</label>
            <textarea 
                id="content" 
                name="content" 
                required 
                value={content} 
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <br />
            <input type="submit" value="Submit"></input>
        </form>

        <div class="show-notes-container">
            <button class="show-notes-button" onClick={toggleNotes}>
                {showNotes ? "Hide All Notes" : "Show All Notes"}
            </button>
        </div>
        {showNotes && (
                <div>
                    <h2 className="all-notes">All Notes</h2>
                    {notes.map((note) => (
                        <Note note={note} onDelete={deleteNote} key={note.id} />
                    ))}
                </div>
            )}
    </div>
}

export default Home