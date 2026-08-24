import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    const name = String(body.name ?? "").trim().slice(0, 80);
    if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    const exists = await db.user.findUnique({ where: { email }, select: { id: true } });
    if (exists) return NextResponse.json({ error: "An account already exists for this email." }, { status: 409 });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await db.user.create({ data: { email, passwordHash, name: name || null }, select: { id: true, email: true, name: true } });
    return NextResponse.json({ user }, { status: 201 });
  } catch { return NextResponse.json({ error: "Unable to create account." }, { status: 500 }); }
}
