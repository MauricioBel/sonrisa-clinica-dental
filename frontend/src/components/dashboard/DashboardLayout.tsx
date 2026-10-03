import { ReactNode } from 'react';
import { Sidebar } from './Sidebar.tsx';
import { TopBar } from './TopBar.tsx';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden lg:ml-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}