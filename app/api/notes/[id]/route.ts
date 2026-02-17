import { connectDB } from "@/lib/db";
import { NotesModel } from "@/models/notes.model";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    id: string;
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
    const id = (await params).id;
    try {
        console.log("ROUTE ID: ", id);
        
        await connectDB();
        const note = await NotesModel.findByIdAndDelete(id);
        if (!note) return NextResponse.json({ success: false, error: "Not found" }, {status: 404});
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error }, {status: 400});
    }
}