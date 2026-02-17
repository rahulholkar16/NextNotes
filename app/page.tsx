import NotesClient from "@/components/NotesClient";
import { connectDB } from "@/lib/db";

export default async function Home() {
  await connectDB();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Notes App</h1>
      <NotesClient />
    </div>
  );
}