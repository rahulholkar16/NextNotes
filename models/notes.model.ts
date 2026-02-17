import { Note } from "@/types";
import mongoose from "mongoose";

const notesSchema = new mongoose.Schema<Note>({
    title: { type: String, require: true },
    content: { type: String, require: true }
}, { timestamps: true });

export const NotesModel = mongoose.models.NOTES || mongoose.model("NOTES", notesSchema);