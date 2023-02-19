-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_appUserId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_appUserId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "appUserId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "appUserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_appUserId_fkey" FOREIGN KEY ("appUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_appUserId_fkey" FOREIGN KEY ("appUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
