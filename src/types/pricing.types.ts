export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface PricingDeliverables {
  pages: number | null;
  revisions: number | null;
  teamSize: number;
  responseTime: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  highlight: boolean;
  badge: string | null;
  cta: string;
  ctaUrl: string;
  color: string;
  deliverables: PricingDeliverables;
  features: PricingFeature[];
}

export interface PricingAddon {
  name: string;
  price: number;
}

export interface PricingFaq {
  question: string;
  answer: string;
}

export interface PricingData {
  billing: {
    monthly: string;
    annual: string;
    annualDiscount: number;
  };
  plans: PricingPlan[];
  addons: PricingAddon[];
  faqs: PricingFaq[];
}