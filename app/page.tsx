import { connectDB } from "@/lib/db";

export default async function Home() {
  await connectDB();
  return (
    <h1>Hello</h1>
  );
}