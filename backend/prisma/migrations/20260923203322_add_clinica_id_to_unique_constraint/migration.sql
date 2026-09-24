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
    "dentistId" INTEGER NOT NULL,
    "treatmentId" INTEGER NOT NULL,
    "clinicaId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Appointment_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "Dentist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointment_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointment_clinicaId_fkey" FOREIGN KEY ("clinicaId") REFERENCES "Clinica" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("clinicaId", "comment", "createdAt", "date", "dentistId", "id", "patientEmail", "patientLastName", "patientName", "patientPhone", "status", "time", "treatmentId") SELECT "clinicaId", "comment", "createdAt", "date", "dentistId", "id", "patientEmail", "patientLastName", "patientName", "patientPhone", "status", "time", "treatmentId" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
CREATE INDEX "Appointment_dentistId_idx" ON "Appointment"("dentistId");
CREATE INDEX "Appointment_treatmentId_idx" ON "Appointment"("treatmentId");
CREATE INDEX "Appointment_date_idx" ON "Appointment"("date");
CREATE INDEX "Appointment_clinicaId_idx" ON "Appointment"("clinicaId");
CREATE UNIQUE INDEX "Appointment_dentistId_date_time_clinicaId_key" ON "Appointment"("dentistId", "date", "time", "clinicaId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
