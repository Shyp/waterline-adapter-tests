CREATE TABLE "paymentbelongsPKTable" (
  "invoice" INT UNIQUE,
  "amount" INT,
  "type" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  "customer_belongs" TEXT,
  PRIMARY KEY (invoice)
);
