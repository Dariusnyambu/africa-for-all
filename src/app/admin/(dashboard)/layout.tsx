import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-sand-50">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden">
        <div className="px-5 py-8 sm:px-8 lg:px-10">{children}</div>
      </main>
    </div>
  );
}
