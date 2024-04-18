-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LinkAnalyticsVisit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "country" TEXT NOT NULL,
    "visited_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "link_id" TEXT NOT NULL,
    CONSTRAINT "LinkAnalyticsVisit_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "LinkAnalytics" ("link_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LinkAnalyticsVisit_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "Link" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LinkAnalyticsVisit" ("country", "id", "link_id", "visited_at") SELECT "country", "id", "link_id", "visited_at" FROM "LinkAnalyticsVisit";
DROP TABLE "LinkAnalyticsVisit";
ALTER TABLE "new_LinkAnalyticsVisit" RENAME TO "LinkAnalyticsVisit";
CREATE UNIQUE INDEX "LinkAnalyticsVisit_id_key" ON "LinkAnalyticsVisit"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
