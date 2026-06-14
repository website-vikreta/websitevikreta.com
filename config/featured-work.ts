import React from "react";
import {
  Building,
  Landmark,
  Castle,
  TowerControl,
  Pyramid,
  Mountain,
} from "lucide-react";
import type { CardItem } from "@/components/ui/expanding-cards";

export const FEATURED_WORK: CardItem[] = [
  {
    id: "sbp-webapp-redesign",
    title: "WebApp Re-design for Sustainable Bitcoin Protocol",
    description:
      "Reimagined the web application experience for a leading sustainable Bitcoin initiative — modernised UI, improved performance, and clearer information architecture.",
    imgSrc:
      "https://images.unsplash.com/photo-1551651142-2e8e62ad4d45?auto=format&fit=crop&w=1200&h=800&q=80",
    icon: React.createElement(Building, { size: 24 }),
    linkHref: "#",
  },
  {
    id: "sbp-business-site",
    title: "Business Website Design & Development for Sustainable Bitcoin Protocol",
    description:
      "Designed and built the public-facing business website, aligning visual identity with the protocol's mission and audience.",
    imgSrc:
      "https://images.unsplash.com/photo-1639322537228-f710d846b88d?auto=format&fit=crop&w=1200&h=800&q=80",
    icon: React.createElement(Landmark, { size: 24 }),
    linkHref: "#",
  },
  {
    id: "blancora-ecommerce",
    title: "E-Commerce Website & CMS for Blancora Clothing",
    description:
      "Built a full e-commerce platform with custom CMS, enabling the Blancora team to manage products, collections, and content independently.",
    imgSrc:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&h=800&q=80",
    icon: React.createElement(Castle, { size: 24 }),
    linkHref: "#",
  },
  {
    id: "iendorse-mvp",
    title: "MVP Development for Influencer Affiliate Startup (iEndorse)",
    description:
      "Built the MVP from the ground up for an influencer affiliate marketing platform — core flows, dashboards, and tracking infrastructure.",
    imgSrc:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&h=800&q=80",
    icon: React.createElement(TowerControl, { size: 24 }),
    linkHref: "#",
  },
  {
    id: "strandzboost-platform",
    title: "Web Application for Medical Survey Platform StrandzBoost",
    description:
      "Developed a web application for collecting and managing medical survey data with a focus on usability and data integrity.",
    imgSrc:
      "https://images.unsplash.com/photo-1576091160550-112173f31c77?auto=format&fit=crop&w=1200&h=800&q=80",
    icon: React.createElement(Pyramid, { size: 24 }),
    linkHref: "#",
  },
  {
    id: "workik-landing",
    title: "Landing Page Design & Development for Workik",
    description:
      "Designed and developed a high-converting landing page focused on clarity, speed, and conversion-driven layout.",
    imgSrc:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&h=800&q=80",
    icon: React.createElement(Mountain, { size: 24 }),
    linkHref: "#",
  },
  {
    id: "budget-renovations-template",
    title: "HTML Template Design & Development for Budget Renovations",
    description:
      "Designed and coded a custom HTML template tailored to the renovation industry — clean, fast-loading, and easy to customise.",
    imgSrc:
      "https://images.unsplash.com/photo-1504917595217-340583404b94?auto=format&fit=crop&w=1200&h=800&q=80",
    icon: React.createElement(Landmark, { size: 24 }),
    linkHref: "#",
  },
];
