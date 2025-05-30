import { ChevronLeft, ChevronRight } from "lucide-react";
import { navigationData } from "../data/navbar-links";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileOpen: boolean;
  onMobileToggle: () => void;
}

export function Sidebar({
  isCollapsed,
  onToggle,
  isMobileOpen,
  onMobileToggle,
}: SidebarProps) {
  const { pathname } = useLocation();

  const NavItem = ({
    item,
    isCollapsed,
  }: {
    item: any;
    isCollapsed: boolean;
  }) => {
    const isActive = pathname === item.href;

    return (
      <Link
        to={item.href}
        className={`
          flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative
          ${
            isActive
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          }
          ${isCollapsed ? "justify-center" : ""}
        `}
        title={isCollapsed ? item.title : undefined}
      >
        <item.icon
          className={`${isCollapsed ? "h-5 w-5" : "h-5 w-5"} flex-shrink-0`}
        />
        {!isCollapsed && (
          <>
            <span className="font-medium">{item.title}</span>
            {item.badge && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                {item.badge}
              </span>
            )}
          </>
        )}

        {/* Tooltip for collapsed state */}
        {isCollapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
            {item.title}
            {item.badge && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {item.badge}
              </span>
            )}
          </div>
        )}
      </Link>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center px-4 border-b border-gray-200 h-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-lg text-gray-900">My App</h1>
              <p className="text-sm text-gray-500">Dashboard</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-x-hidden p-4 space-y-6">
        {/* Main Navigation */}
        <div>
          {!isCollapsed && (
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Main
            </h2>
          )}
          <nav className="space-y-1">
            {navigationData.main.map((item) => (
              <NavItem key={item.id} item={item} isCollapsed={isCollapsed} />
            ))}
          </nav>
        </div>

        {/* Secondary Navigation */}
        <div>
          {!isCollapsed && (
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Tools
            </h2>
          )}
          <nav className="space-y-1">
            {navigationData.secondary.map((item) => (
              <NavItem key={item.id} item={item} isCollapsed={isCollapsed} />
            ))}
          </nav>
        </div>

        {/* Settings Navigation */}
        <div>
          {!isCollapsed && (
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Account
            </h2>
          )}
          <nav className="space-y-1">
            {navigationData.settings.map((item) => (
              <NavItem key={item.id} item={item} isCollapsed={isCollapsed} />
            ))}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-medium text-sm">JD</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">John Doe</p>
              <p className="text-sm text-gray-500 truncate">john@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileToggle}
        />
      )}

      {/* Desktop Sidebar */}
      <div
        className={`
        hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "w-64"}
      `}
      >
        <SidebarContent />

        {/* Collapse Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute right-3 cursor-pointer top-7 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:hidden
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <SidebarContent />
      </div>
    </>
  );
}
