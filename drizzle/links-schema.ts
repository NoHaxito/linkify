import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "@/drizzle/auth-schema";

export const links = pgTable("link", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  url: text("url").notNull(),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
});

export const linkSettings = pgTable("link_settings", {
  linkId: text("link_id")
    .primaryKey()
    .references(() => links.id, {
      onDelete: "cascade",
    }),
  allowUnauthenticated: boolean("allow_unauthenticated").notNull(),
  password: text("password"),
  customMetadata: boolean("custom_metadata"),
});

export const linkAnalytics = pgTable("link_analytics", {
  linkId: text("link_id")
    .primaryKey()
    .references(() => links.id, { onDelete: "cascade" }),
});

export const linkAnalyticsVisits = pgTable("link_analytics_visit", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  country: text("country").notNull(),
  visitedAt: timestamp("visited_at").notNull().defaultNow(),
  linkId: text("link_id")
    .notNull()
    .references(() => links.id, { onDelete: "cascade" }),
  analyticsId: text("analytics_id")
    .notNull()
    .references(() => linkAnalytics.linkId, { onDelete: "cascade" }),
});

export const linksRelations = relations(links, ({ one, many }) => ({
  user: one(user, {
    fields: [links.userId],
    references: [user.id],
  }),
  settings: one(linkSettings, {
    fields: [links.id],
    references: [linkSettings.linkId],
  }),
  analytics: one(linkAnalytics, {
    fields: [links.id],
    references: [linkAnalytics.linkId],
  }),
  analyticsVisits: many(linkAnalyticsVisits),
}));

export const linkSettingsRelations = relations(linkSettings, ({ one }) => ({
  link: one(links, {
    fields: [linkSettings.linkId],
    references: [links.id],
  }),
}));

export const linkAnalyticsRelations = relations(
  linkAnalytics,
  ({ one, many }) => ({
    link: one(links, {
      fields: [linkAnalytics.linkId],
      references: [links.id],
    }),
    visits: many(linkAnalyticsVisits),
  })
);

export const linkAnalyticsVisitsRelations = relations(
  linkAnalyticsVisits,
  ({ one }) => ({
    link: one(links, {
      fields: [linkAnalyticsVisits.linkId],
      references: [links.id],
    }),
    analytics: one(linkAnalytics, {
      fields: [linkAnalyticsVisits.analyticsId],
      references: [linkAnalytics.linkId],
    }),
  })
);
