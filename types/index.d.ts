import mongoose, { Types } from "mongoose";

interface Note extends mongoose.Document {
    _id: Types.ObjectId;
    title: string;
    content: string;
};

interface NotesClientProp {
    initialNotes: {
        _id: string;
        title: string;
        content: string;
    }[];
};