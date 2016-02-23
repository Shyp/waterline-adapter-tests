CREATE TABLE "thing" (
    "name" TEXT,
    "age" INT,
    "description" TEXT,
    "id" SERIAL UNIQUE,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY (id)
);
