-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "expires_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,
    CONSTRAINT "Link_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("expires_at", "id", "slug", "url", "user_id") SELECT "expires_at", "id", "slug", "url", "user_id" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
CREATE UNIQUE INDEX "Link_slug_key" ON "Link"("slug");
CREATE TABLE "new_LinkSettings" (
    "link_id" TEXT NOT NULL,
    "allowUnauthenticated" BOOLEAN NOT NULL DEFAULT true,
    "password" TEXT,
    CONSTRAINT "LinkSettings_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "Link" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LinkSettings" ("link_id", "password") SELECT "link_id", "password" FROM "LinkSettings";
DROP TABLE "LinkSettings";
ALTER TABLE "new_LinkSettings" RENAME TO "LinkSettings";
CREATE UNIQUE INDEX "LinkSettings_link_id_key" ON "LinkSettings"("link_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
