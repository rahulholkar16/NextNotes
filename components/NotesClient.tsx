"use client";

import { useState } from "react";

const NotesClient = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="space-y-6">
            <form action="" className="bg-white p-6 rounded-lg shadow-md">
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

                    <button type="submit" disabled={loading} className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50">
                        {loading ? "creating..." : "Create Note" }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NotesClient;
