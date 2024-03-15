'use client'

import React, { useState, useEffect } from 'react';

interface Note {
  _id: string;
  title: string;
  note: string;
  author: string;
  specialnote: string;
  mood: string;
  createdAt: string;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:3300/notes');
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchNotes();
  }, []);

  const convertToIST = (createdAt: string) => {
    const date = new Date(createdAt);
    
    const ISTOffset = 330 * 60 * 1000; // (5 hours 30 minutes)
    const ISTTime = new Date(date.getTime() + ISTOffset);
    
    // date as dd/mm/yyyy
    const formattedDate = `${ISTTime.getDate().toString().padStart(2, '0')}/${(ISTTime.getMonth() + 1).toString().padStart(2, '0')}/${ISTTime.getFullYear()}`;
    
    const formattedTime = ISTTime.toLocaleTimeString('en-IN', { hour12: false });
    
    return `${formattedDate} ${formattedTime}`;
  }

  const handleUpdateNote = (id: string) => {
    //  update logic 
    console.log("Update note with ID:", id);
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3300/notes/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
      // Remove deleted note
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {notes.map((note) => (
        <div key={note._id} className="bg-gray-200 p-4 rounded-md shadow-md">
          <h2 className="text-lg font-bold">{note.title}</h2>
          <p className="text-gray-600">{note.note}</p>
          <p className="text-gray-600">Author: {note.author}</p>
          <p className="text-gray-600">Special Note: {note.specialnote}</p>
          <p className="text-gray-600">Mood: {note.mood}</p>
          <p className="text-gray-600">Created At: {convertToIST(note.createdAt)}</p>
          <div className="flex justify-between mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleUpdateNote(note._id)}>Update</button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeleteNote(note._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notes;
