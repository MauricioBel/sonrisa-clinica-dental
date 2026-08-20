-- CreateTable
CREATE TABLE "TimeBlock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dentistId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TimeBlock_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "Dentist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "TimeBlock_dentistId_date_idx" ON "TimeBlock"("dentistId", "date");
