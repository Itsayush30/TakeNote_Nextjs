'use client'

import React, { useState, useEffect, ChangeEvent } from "react";
import { UPDATE_NOTE_API } from "../../../utlis/constants";

interface Note {
  title: string;
  note: string;
  author: string;
  specialnote: string;
  mood: string;
}

const UpdateNote = () => {
  const [note, setNote] = useState<Note>({
    title: "",
    note: "",
    author: "",
    specialnote: "",
    mood: "",
  });
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const id = getIdFromUrl(); // Extract id 
        if (!id) return;
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchNote();
  }, []);

  const getIdFromUrl = () => {
    const path = window.location.pathname;
    const id = path.substring(path.lastIndexOf("/") + 1);
    return id;
  };

  const handleUpdateNote = async () => {
    try {
      const id = getIdFromUrl();
      if (!id) return;
      const response = await fetch(`${UPDATE_NOTE_API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        throw new Error("Failed to update note");
      }
      setMessage("Note updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to update note");
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Update Note</h2>
          {/* Add message display */}
          {message && <p className="text-green-500 mb-4">{message}</p>}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              id="title"
              name="title"
              value={note.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="note"
            >
              Note
            </label>
            <textarea
              className="w-full p-2 border rounded-md"
              id="note"
              name="note"
              rows={4}
              value={note.note}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="author"
            >
              Author
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              id="author"
              name="author"
              value={note.author}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="specialnote"
            >
              Special Note
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              id="specialnote"
              name="specialnote"
              value={note.specialnote}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mood"
            >
              Mood
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              id="mood"
              name="mood"
              value={note.mood}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleUpdateNote}
            >
              Update Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateNote;
