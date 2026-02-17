import NotesClient from "@/components/NotesClient";
import { connectDB } from "@/lib/db";
import { NotesModel } from "@/models/notes.model";

async function getNotes() {
  await connectDB();
  const notes = await NotesModel.find().sort({ createdAt: -1 }).lean();
  return notes.map((note) => ({
    ...note,
    _id: note?._id.toString()
  }));
};

export default async function Home() {
  const notes = await getNotes();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Notes App</h1>
      <NotesClient initialNotes={notes} />
    </div>
  );
}