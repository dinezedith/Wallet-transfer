export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "EZ Pay",
  description: "Making your Purchase more Easier.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Pay",
      href: "/pay",
    }
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Logout",
      href: "/logout",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    }
  ],
  paymentModes : [
    {key: "usdc", label: "USDC.e"},
  ]
};
