-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "github_id" INTEGER NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "expires_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,
    CONSTRAINT "Link_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LinkAnalytics" (
    "link_id" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "LinkAnalytics_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "Link" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LinkAnalyticsVisit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "country" TEXT NOT NULL,
    "visited_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "link_id" TEXT NOT NULL,
    CONSTRAINT "LinkAnalyticsVisit_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "LinkAnalytics" ("link_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LinkAnalyticsVisit_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "Link" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LinkSettings" (
    "link_id" TEXT NOT NULL PRIMARY KEY,
    "allowUnauthenticated" BOOLEAN NOT NULL,
    "password" TEXT,
    "custom_metadata" BOOLEAN,
    CONSTRAINT "LinkSettings_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "Link" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_github_id_key" ON "User"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "Link_slug_key" ON "Link"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LinkAnalyticsVisit_id_key" ON "LinkAnalyticsVisit"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LinkSettings_link_id_key" ON "LinkSettings"("link_id");
