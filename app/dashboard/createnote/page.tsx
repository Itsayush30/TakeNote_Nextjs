'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react';

interface Note {
  author: string;
  title: string;
  note: string;
  specialNote: string;
  mood: string;
}

const AddNote: React.FC = () => {
  const [author, setAuthor] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [specialNote, setSpecialNote] = useState<string>('');
  const [mood, setMood] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token: string | null = localStorage.getItem('token'); // Get token from localStorage
      if (!token) {
        throw new Error('Token not found in localStorage');
      }

      const response = await fetch('http://localhost:3300/notes/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ author, title, note, specialNote, mood }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Note added successfully!');
      } else {
        setMessage(data.message || 'Failed to add note');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while processing your request');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'author':
        setAuthor(value);
        break;
      case 'title':
        setTitle(value);
        break;
      case 'note':
        setNote(value);
        break;
      case 'specialNote':
        setSpecialNote(value);
        break;
      case 'mood':
        setMood(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Note</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="author" className="sr-only">Author</label>
              <input
                id="author"
                name="author"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Author"
                value={author}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="title" className="sr-only">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Title"
                value={title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="note" className="sr-only">Note</label>
              <textarea
                id="note"
                name="note"
                rows={3}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Note"
                value={note}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="specialNote" className="sr-only">Special Note</label>
              <input
                id="specialNote"
                name="specialNote"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Special Note"
                value={specialNote}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="mood" className="sr-only">Mood</label>
              <input
                id="mood"
                name="mood"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Mood (Happy, Sad, Angry, Lone)"
                value={mood}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Note
            </button>
          </div>
        </form>
        {message && (
          <p className="mt-2 text-center text-sm text-red-600" role="alert">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddNote;
