/*
  Warnings:

  - Added the required column `description` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "edited" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "groupId" INTEGER NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "profileId" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
