import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import "../styles/SentimentCalendar.css"
import api from '../api';

function SentimentCalendar( {notes} ) {
    const [value, setValue] = useState(new Date());

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
        if (sentimentCount.happy > sentimentCount.sad) return ':)';
        if (sentimentCount.sad > sentimentCount.happy) return ':(';
        return ':|';
    };

    return (
        <div>
            <Calendar
                onChange={setValue}
                value={value}
                tileContent={({ date }) => (
                    <div>
                        {getEmojiForDate(date)}
                    </div>
                )}
            />
        </div>
    );
}

export default SentimentCalendar;
