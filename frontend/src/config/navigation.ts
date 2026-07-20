export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export const publicNavItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Features", href: "/features" },
  { title: "Contact", href: "/contact" },
];

export const dashboardNavItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "General Aptitude", href: "/dashboard/general-aptitude" },
  { title: "Interview", href: "/dashboard/interview" },
  { title: "Reports", href: "/dashboard/reports" },
  { title: "Profile", href: "/dashboard/profile" },
];

export const authNavItems: NavItem[] = [
  { title: "Login", href: "/login" },
  { title: "Sign Up", href: "/signup" },
];
