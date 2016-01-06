CREATE TABLE "apartmentTable" (
  "building" TEXT,
  "number" TEXT UNIQUE,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY (number)
);
