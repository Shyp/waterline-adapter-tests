CREATE TABLE "customerbelongsPKTable" (
  "username" TEXT UNIQUE,
  "name" TEXT,
  "title" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY (username)
);
