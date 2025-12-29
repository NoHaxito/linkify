export interface Link {
  id: string;
  slug: string;
  url: string;
  expiresAt: Date | null;
  createdAt: Date;
  userId: string | null;
}

export interface LinkSettings {
  linkId: string;
  allowUnauthenticated: boolean;
  password: string | null;
  customMetadata: boolean | null;
}

export interface LinkAnalytics {
  linkId: string;
}

export interface LinkAnalyticsVisit {
  id: number;
  country: string;
  visitedAt: Date;
  linkId: string;
  analyticsId: string;
}

export interface LinkProps extends Link {
  analytics: { linkId: string; visits: LinkAnalyticsVisit[] } | null;
  settings: LinkSettings | null;
}
