CREATE TABLE "payment" (
  "amount" INT,
  "type" TEXT,
  "id" SERIAL UNIQUE,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  "apartment_id" TEXT,
  "customer_id" INT,
  PRIMARY KEY (id)
);
