-- DropForeignKey
ALTER TABLE "Slide" DROP CONSTRAINT "Slide_presentationId_fkey";

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
