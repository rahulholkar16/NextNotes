import { connectDB } from "@/lib/db";
import { NotesModel } from "@/models/notes.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { title, content } = body;
        if (!title || !content) return NextResponse.json({ success: false, msg: "All field are requird!" }, { status: 404 });
        const note = await NotesModel.create({
            title,
            content
        });
        return NextResponse.json({ success: true, note }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error });
    }
};

export async function GET () {
    try {
        await connectDB();
        const notes = await NotesModel.find().sort({ createAt: -1 });
        return NextResponse.json({ success: true, notes });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 400 });
    }
};