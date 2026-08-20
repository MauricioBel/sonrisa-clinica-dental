-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patientName" TEXT NOT NULL,
    "patientLastName" TEXT NOT NULL,
    "patientEmail" TEXT NOT NULL,
    "patientPhone" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "comment" TEXT,
    "status" TEXT NOT NULL DEFAULT 'CONFIRMED',
    "source" TEXT NOT NULL DEFAULT 'WEB',
    "cancelReason" TEXT,
    "canceledAt" DATETIME,
    "rescheduledFromId" INTEGER,
    "conflictKey" TEXT,
    "dentistId" INTEGER NOT NULL,
    "treatmentId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Appointment_rescheduledFromId_fkey" FOREIGN KEY ("rescheduledFromId") REFERENCES "Appointment" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Appointment_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "Dentist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointment_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("comment", "createdAt", "date", "dentistId", "id", "patientEmail", "patientLastName", "patientName", "patientPhone", "status", "time", "treatmentId") SELECT "comment", "createdAt", "date", "dentistId", "id", "patientEmail", "patientLastName", "patientName", "patientPhone", "status", "time", "treatmentId" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
-- Backfill: toda cita existente y activa conserva la protección de doble reserva.
UPDATE "Appointment" SET "conflictKey" = "dentistId" || ':' || "date" || ':' || "time" WHERE "status" != 'CANCELLED';
CREATE UNIQUE INDEX "Appointment_conflictKey_key" ON "Appointment"("conflictKey");
CREATE INDEX "Appointment_dentistId_idx" ON "Appointment"("dentistId");
CREATE INDEX "Appointment_treatmentId_idx" ON "Appointment"("treatmentId");
CREATE INDEX "Appointment_date_idx" ON "Appointment"("date");
CREATE INDEX "Appointment_status_idx" ON "Appointment"("status");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
