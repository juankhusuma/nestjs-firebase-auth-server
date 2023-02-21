/*
  Warnings:

  - Added the required column `role` to the `created_at` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "created_at" ADD COLUMN     "role" "Roles" NOT NULL;
