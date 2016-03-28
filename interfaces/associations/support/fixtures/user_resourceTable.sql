CREATE TABLE user_resource (
  "name" TEXT,
  "quantity" INT,
  "id" SERIAL UNIQUE,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  "profile_id" INT,
  PRIMARY KEY (id)
);
