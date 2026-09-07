import { redirect } from "next/navigation";
import { verifySession } from "../../../lib/session";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await verifySession();

  if (!user) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}