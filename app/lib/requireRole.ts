import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function requireRole(role: string) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== role) {
    redirect("/login");
  }
}
