import {
  BarChart3,
  Users,
  FileText,
  Settings,
  Mail,
  Calendar,
  Folder,
  Bell,
  Search,
  NotebookIcon,
} from "lucide-react";

export const navigationData = {
  main: [
    {
      id: "dashboard",
      title: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
    },
    {
      id: "users",
      title: "Users",
      href: "/users",
      icon: Users,
    },
    {
      id: "projects",
      title: "Projects",
      href: "/projects",
      icon: Folder,
    },
  ],
  secondary: [
    {
      id: "reports",
      title: "Reports",
      href: "/reports",
      icon: FileText,
    },
    {
      id: "calendar",
      title: "Calendar",
      href: "/calendar",
      icon: Calendar,
    },
    {
      id: "messages",
      title: "Messages",
      href: "/messages",
      icon: Mail,
      badge: 3,
    },
    {
      id: "search",
      title: "Search",
      href: "/search",
      icon: Search,
    },
    {
      id: "task-state",
      title: "Task State",
      href: "/task-state",
      icon: NotebookIcon,
    },
  ],
  settings: [
    {
      id: "settings",
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      id: "notifications",
      title: "Notifications",
      href: "/notifications",
      icon: Bell,
    },
  ],
};
