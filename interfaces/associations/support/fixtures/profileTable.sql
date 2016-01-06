CREATE TABLE "profileTable" (
  "name" TEXT,
  "level" INT,
  "id" SERIAL UNIQUE,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  "user_resource_id" INT, 
  PRIMARY KEY (id)
);
