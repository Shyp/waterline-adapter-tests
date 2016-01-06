CREATE TABLE "customerTable" (
  "name" TEXT,
  "title" TEXT,
  "capital" INT,
  "id" SERIAL UNIQUE,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY (id)
);
