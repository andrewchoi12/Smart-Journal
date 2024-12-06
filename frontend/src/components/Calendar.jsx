import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import "../styles/SentimentCalendar.css"
import api from '../api';

function SentimentCalendar( {notes} ) {
    const [value, setValue] = useState(new Date());
    const [selectedNotes, setSelectedNotes] = useState([]);

    // Filter notes for the selected date
    useEffect(() => {
        filterNotesForDate(value);
    }, [notes])

    const filterNotesForDate = (date) => {
        const filteredNotes = notes.filter(note => {
            const noteDate = new Date(note.created_at)
            return noteDate.toDateString() === date.toDateString()
        });
        setSelectedNotes(filteredNotes)
    }

    const getEmojiForDate = (date) => {
        const filteredNotes = notes.filter(note => {
            const noteDate = new Date(note.created_at);
            return noteDate.toDateString() === date.toDateString();
        });

        if (filteredNotes.length === 0) return null;

        const sentimentCount = { happy: 0, sad: 0, neutral: 0 };

        filteredNotes.forEach(note => {
            sentimentCount[note.sentiment]++;
        });

        // Determine which emoji to show based on the counts
        if (sentimentCount.happy > sentimentCount.sad) return '😃';
        if (sentimentCount.sad > sentimentCount.happy) return '🙁';
        return '😐';
    };

    const handleDayClick = (date) => {
        setValue(date)
        filterNotesForDate(date)
    }

    // Function to delete a note by ID
    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) {
                alert("Note Deleted!");
                // Filter out the deleted note from the selected notes list
                setSelectedNotes(prevNotes => prevNotes.filter(note => note.id !== id));
            } else {
                alert("Failed to delete note.");
            }
        }).catch((error) => alert(error));
    };

    return (
        <div>
            <Calendar
                locale="en-US"
                onChange={handleDayClick}
                value={value}
                tileContent={({ date }) => (
                    <div className="emoji-container">
                        {getEmojiForDate(date)}
                    </div>
                )}
            />
            <div class="today-notes">
                <h2>Notes for {value.toDateString()}</h2>
                {selectedNotes.length > 0 ? (
                    <div>
                        {selectedNotes.map((note) => (
                            <div class="today-note" key={note.id}>
                                <h3>{note.title}</h3>
                                <p>{note.content}</p>
                                <button onClick={() => deleteNote(note.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No notes for this day.</p>
                )}
            </div>
        </div>
    );
}

export default SentimentCalendar;