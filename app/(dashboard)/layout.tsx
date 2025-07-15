import SideNav from "@/components/nav/SideNav";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main className="flex-1 flex justify-center">{children}</main>
    </div>
  );
}
