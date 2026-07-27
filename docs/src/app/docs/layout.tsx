import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { BackToTop } from "@/components/BackToTop";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 max-w-[1400px] mx-auto w-full px-4 md:px-6">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden md:block w-[240px] shrink-0 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto no-scrollbar pt-4 pb-16">
            <Sidebar />
          </aside>
          {/* Main content */}
          <main className="flex-1 min-w-0 py-8 pb-24">
            {children}
          </main>
        </div>
      </div>
      <BackToTop />
    </div>
  );
}
