import { requireRole } from "@/app/lib/requireRole";

export default async function AdminPage() {
  await requireRole("Admin");
  return <div>Admin content</div>;
}
