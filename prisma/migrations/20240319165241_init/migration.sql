-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "expires_at" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Link_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LinkSettings" (
    "link_id" TEXT NOT NULL,
    "password" TEXT,
    CONSTRAINT "LinkSettings_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "Link" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_slug_key" ON "Link"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LinkSettings_link_id_key" ON "LinkSettings"("link_id");
