CREATE TABLE "document" (
  "title" TEXT UNIQUE,
  "number" SERIAL,
  "serialNumber" TEXT UNIQUE,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY (title)
);
