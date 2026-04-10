import cron from "node-cron";
import { prisma } from "@/lib/prisma";

console.log("🚀 Cron file loaded"); // 👈 IMPORTANT

cron.schedule("*/1 * * * *", async () => {
  console.log("🧹 Cleaning expired sessions...");

  const deleted = await prisma.session.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });

  console.log(`✅ Deleted ${deleted.count} sessions`);
});