-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LinkSettings" (
    "link_id" TEXT NOT NULL PRIMARY KEY,
    "allowUnauthenticated" BOOLEAN NOT NULL,
    "password" TEXT,
    CONSTRAINT "LinkSettings_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "Link" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LinkSettings" ("allowUnauthenticated", "link_id", "password") SELECT "allowUnauthenticated", "link_id", "password" FROM "LinkSettings";
DROP TABLE "LinkSettings";
ALTER TABLE "new_LinkSettings" RENAME TO "LinkSettings";
CREATE UNIQUE INDEX "LinkSettings_link_id_key" ON "LinkSettings"("link_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
