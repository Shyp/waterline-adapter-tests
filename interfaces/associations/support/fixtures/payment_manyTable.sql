CREATE TABLE "payment_many" (
  "amount" INT,
  "type" TEXT,
  "id" SERIAL UNIQUE,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  "customer_many_id" INT,
  "customer_many_patron_id" INT, PRIMARY KEY (id)
);
