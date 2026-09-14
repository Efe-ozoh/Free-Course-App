import { redirect } from "next/navigation";
import { verifySession } from "../../../lib/session";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await verifySession();

  // Protect every route in this group before its page is rendered.
  if (!user) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}