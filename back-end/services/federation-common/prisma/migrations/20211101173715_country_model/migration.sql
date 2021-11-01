-- CreateTable
CREATE TABLE "Country" (
    "countryId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alpha2" VARCHAR(2) NOT NULL,
    "alpha3" VARCHAR(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("countryId")
);
