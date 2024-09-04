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
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Pay",
      href: "/pay",
    }
  ],
  paymentModes : [
    {key: "usdc", label: "USDC.e"},
  ]
};
