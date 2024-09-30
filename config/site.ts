export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "EZ Pay",
  description: "Buying Made Easy.",
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
