import SideNav from "@/components/nav/SideNav";
import UserMenu from "@/components/UserMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <UserMenu/>
      <main className="flex-1 flex justify-center">{children}</main>
    </div>
  );
}
