CREATE TABLE "paymentbelongsTable" (
  "amount" INT,
  "type" TEXT,
  "id" SERIAL UNIQUE,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  "customer_belongs" INT,
  PRIMARY KEY (id)
);
