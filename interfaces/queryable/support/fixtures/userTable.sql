-- queryable test fixture
CREATE TABLE "userTable2" (
  "first_name" TEXT,
  "last_name" TEXT,
  "email" TEXT,
  "title" TEXT,
  "phone" TEXT,
  "type" TEXT,
  "favoriteFruit" TEXT,
  "age" INT,
  "dob" DATE,
  "status" BOOLEAN,
  "percent" DOUBLE PRECISION,
  "list" TEXT,
  "obj" JSON,
  "id" SERIAL UNIQUE,
  "createdAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY (id)
);
