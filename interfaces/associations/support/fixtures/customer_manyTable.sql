CREATE TABLE "customer_manyTable" (
  "name" TEXT,
  "id" SERIAL UNIQUE,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY (id)
);
