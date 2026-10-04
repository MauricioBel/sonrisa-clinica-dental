import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar.tsx';
import { TopBar } from './TopBar.tsx';

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}