"use client";

import { NotesClientProp } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";

const NotesClient: React.FC<NotesClientProp> = ({ initialNotes }) => {
    const [notes, setNotes] = useState(initialNotes);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const createNote = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        setLoading(true);
        try {
            const responce = await fetch("/api/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content }),
            });

            const result = await responce.json();
            if (result.success) setNotes([result.note, ...notes]);
            setLoading(false);
            setTitle("");
            setContent("");
            toast.success("Notes created successfully.");
        } catch (error) {
            console.log("Error creating note: ", error);
            toast.error("Failed to create note.");
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <form
                onSubmit={createNote}
                className="bg-white p-6 rounded-lg shadow-md"
            >
                <h2 className="text-xl mb-4 font-semibold">Create New Note</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Note Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <textarea
                        placeholder="Note Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? "creating..." : "Create Note"}
                    </button>
                </div>
            </form>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold"> Your Notes ({notes.length}) </h2>
                {notes.length === 0 ? (<p className="text-gray-600">No Notes</p>) : (
                    notes.map((note) => (
                        <div key={note._id} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-start mb-2 ">
                                <h3 className="text-lg font-semibold">{note.title}</h3>
                                <div className="flex gap-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-sm text-white px-6 py-2 rounded-lg shadow-sm">Edit</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-sm text-white px-6 py-2 rounded-lg shadow-sm">Delete</button>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-2">{note.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NotesClient;
