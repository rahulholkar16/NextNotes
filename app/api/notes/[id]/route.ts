import { connectDB } from "@/lib/db";
import { NotesModel } from "@/models/notes.model";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    id: string;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<Params> }) {
    try {
        const id = (await params).id;
        await connectDB();
        const body = await req.json();
        const { title, content } = body;
        const note = await NotesModel.findByIdAndUpdate(id, {
            title,
            content
        }, { new: true });

        if (!note) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true, note });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 400 });
    }
};

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
    try {
        const id = (await params).id;
        await connectDB();
        const note = await NotesModel.findByIdAndDelete(id);
        if (!note) return NextResponse.json({ success: false, error: "Not found" }, {status: 404});
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error }, {status: 400});
    }
};