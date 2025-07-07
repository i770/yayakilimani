import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bus, 
  Fuel, 
  Wrench, 
  Users, 
  DollarSign, 
  BarChart3, 
  ChevronLeft, 
  Menu,
  Settings,
  BookOpenText,
  MapPin,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  isMobile: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, toggleSidebar }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const sidebarLinks = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Vehicles', path: '/vehicles', icon: <Bus size={20} /> },
    { name: 'Fuel Management', path: '/fuel', icon: <Fuel size={20} /> },
    { name: 'Maintenance', path: '/maintenance', icon: <Wrench size={20} /> },
    { name: 'Drivers', path: '/drivers', icon: <Users size={20} /> },
    { name: 'Expenses', path: '/expenses', icon: <DollarSign size={20} /> },
    { name: 'Reports', path: '/reports', icon: <BarChart3 size={20} /> },
    { name: 'Bookings', path: '/bookings', icon: <BookOpenText size={20} /> },
    { name: 'Tracking', path: '/tracking', icon: <MapPin size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside 
      className={`${
        isMobile 
          ? 'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out'
          : 'sticky top-0 h-screen'
      } ${
        isMobile && !collapsed ? 'translate-x-0' : (isMobile ? '-translate-x-full' : '')
      } ${
        collapsed && !isMobile ? 'w-20' : 'w-64'
      } bg-white border-r border-gray-200 flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <Bus className="text-primary-600\" size={24} />
            <h1 className="text-lg font-bold text-primary-900">YAYA KILIMANI</h1>
          </div>
        ) : (
          <Bus className="mx-auto text-primary-600" size={24} />
        )}
        
        {isMobile ? (
          <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-gray-100">
            <ChevronLeft size={20} />
          </button>
        ) : (
          <button onClick={toggleCollapse} className="p-1 rounded-md hover:bg-gray-100">
            <ChevronLeft className={`transform transition-transform ${collapsed ? 'rotate-180' : ''}`} size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {sidebarLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`sidebar-link ${location.pathname === link.path ? 'active' : ''} ${
                  collapsed ? 'justify-center' : ''
                }`}
              >
                {link.icon}
                {!collapsed && <span>{link.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className={`flex items-center text-gray-700 hover:text-primary-700 transition-colors ${
          collapsed ? 'justify-center' : 'gap-3'
        }`}>
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;