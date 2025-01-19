import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "public", "uploads");
const reportDir = path.join(process.cwd(), "public", "reports");

// Ensure directories exist
fs.mkdirSync(uploadDir, { recursive: true });
fs.mkdirSync(reportDir, { recursive: true });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Save uploaded files
      const files = req.body; // Parse the files from the request
      const savedFiles = [];

      for (const file of req.files) {
        const filePath = path.join(uploadDir, file.originalname);
        fs.writeFileSync(filePath, file.buffer);
        savedFiles.push(filePath);
      }

      // Generate a mock ECO report
      const reportPath = path.join(reportDir, "eco-report.pdf");
      fs.writeFileSync(reportPath, "Generated ECO Report");

      res.status(200).json({ reportUrl: `/reports/eco-report.pdf` });
    } catch (error) {
      console.error("Error processing files:", error);
      res.status(500).json({ error: "Failed to process files" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
