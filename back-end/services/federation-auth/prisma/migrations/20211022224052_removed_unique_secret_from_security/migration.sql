-- DropIndex
DROP INDEX "Security_secret_key";

-- AlterTable
ALTER TABLE "Security" ALTER COLUMN "secret" DROP NOT NULL;
