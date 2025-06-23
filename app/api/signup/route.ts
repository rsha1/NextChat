import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password, role } = await req.json();
  try {
    const user = await createUser(email, password, role);
    return NextResponse.json({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  } catch (e: any) {
    return new NextResponse(e.message, { status: 400 });
  }
}
