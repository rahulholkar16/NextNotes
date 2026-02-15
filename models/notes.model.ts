import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title: { type: String, require: true },
    content: { type: String, require: true }
}, { timestamps: true });

export const NotesModel = mongoose.models.NOTES || mongoose.model("NOTES", notesSchema);