-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Treatment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "benefits" JSONB NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Treatment" ("benefits", "createdAt", "description", "durationMinutes", "id", "imageUrl", "isFeatured", "name", "price", "shortDescription", "slug", "sortOrder", "updatedAt") SELECT "benefits", "createdAt", "description", "durationMinutes", "id", "imageUrl", "isFeatured", "name", "price", "shortDescription", "slug", "sortOrder", "updatedAt" FROM "Treatment";
DROP TABLE "Treatment";
ALTER TABLE "new_Treatment" RENAME TO "Treatment";
CREATE UNIQUE INDEX "Treatment_slug_key" ON "Treatment"("slug");
CREATE INDEX "Treatment_slug_idx" ON "Treatment"("slug");
CREATE INDEX "Treatment_isActive_idx" ON "Treatment"("isActive");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
