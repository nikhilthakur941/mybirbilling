import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export async function generateInvoice(booking: any): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const fileName = `invoice-${booking.id}.pdf`;
      const invoicesDir = path.join(process.cwd(), "public", "invoices");

      if (!fs.existsSync(invoicesDir)) {
        fs.mkdirSync(invoicesDir, { recursive: true });
      }

      const filePath = path.join(invoicesDir, fileName);

      // ✅ FIX: force custom font (prevents Helvetica error)
      const fontPath = path.join(
        process.cwd(),
        "public",
        "fonts",
        "Roboto-Regular.ttf"
      );

      if (!fs.existsSync(fontPath)) {
        throw new Error("Font not found: " + fontPath);
      }

      const doc = new PDFDocument({
        margin: 50,
        font: fontPath, // 👈 IMPORTANT FIX
      });

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      doc.font(fontPath);

      // ================= LOGO =================
      const logoPath = path.join(process.cwd(), "public", "logo.png");
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 50, 40, { width: 120 });
      }

      // ================= HEADER =================
      doc
        .fontSize(20)
        .fillColor("#333")
        .text("INVOICE", 400, 50);

      doc
        .fontSize(10)
        .text(`Invoice #: ${booking.id}`, 400, 80)
        .text(`Date: ${new Date().toLocaleDateString()}`, 400, 95);

      // ================= CUSTOMER =================
      doc.moveDown(4);

      doc
        .fontSize(12)
        .fillColor("#000")
        .text("Billed To:", 50)
        .fontSize(11)
        .text(booking.guestName)
        .text(booking.guestEmail || "N/A")
        .text(booking.guestPhone || "N/A");

      // ================= TABLE =================
      const tableTop = 220;

      doc
        .rect(50, tableTop, 500, 25)
        .fill("#0EA5E9");

      doc
        .fillColor("#fff")
        .fontSize(12)
        .text("Item", 60, tableTop + 7)
        .text("Details", 200, tableTop + 7)
        .text("Amount", 450, tableTop + 7, { align: "right" });

      let y = tableTop + 35;

      const addRow = (item: string, details: string, amount: number) => {
        doc
          .fillColor("#000")
          .fontSize(11)
          .text(item, 60, y)
          .text(details, 200, y)
          .text(`₹${amount}`, 450, y, { align: "right" });

        y += 25;
      };

      // ================= DATA =================
      addRow(
        "Package",
        booking.package?.name || "-",
        booking.package?.price || 0
      );

      if (booking.stay) {
        addRow("Stay", booking.stay.name, booking.stay.price || 0);
      }

      if (booking.rentals?.length > 0) {
        booking.rentals.forEach((r: any) => {
          addRow("Rental", r.rental.name, r.rental.price || 0);
        });
      }

      // ================= TOTAL =================
      doc.moveTo(50, y).lineTo(550, y).stroke();
      y += 15;

      doc
        .fontSize(12)
        .text("Total", 350, y)
        .fontSize(12)
        .text(`₹${booking.totalAmount}`, 450, y, { align: "right" });

      y += 30;

      // ================= PAYMENT =================
      doc
        .fontSize(10)
        .fillColor("#555")
        .text(`Payment Status: ${booking.paymentStatus}`, 50, y)
        .text(
          `Payment ID: ${booking.razorpayPaymentId || "N/A"}`,
          50,
          y + 15
        );

      // ================= FOOTER =================
      doc
        .fontSize(10)
        .fillColor("#999")
        .text(
          "Thank you for choosing MyBirBilling ✈️",
          50,
          750,
          { align: "center", width: 500 }
        );

      doc.end();

      stream.on("finish", () => {
        resolve(`/invoices/${fileName}`);
      });

      stream.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
}