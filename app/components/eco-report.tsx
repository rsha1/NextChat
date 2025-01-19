import React, { useState } from "react";
import styles from "../styles/eco-report.module.scss";

export default function EcoReport() {
  const [files, setFiles] = useState<File[]>([]);
  const [reportUrl, setReportUrl] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const generateReport = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("/api/eco-report", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate report");
      }

      const data = await response.json();
      setReportUrl(data.reportUrl);
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <div className={styles["eco-report"]}>
      <h1>ECO Report Generator</h1>
      <input
        type="file"
        multiple
        onChange={handleFileUpload}
        accept="image/*,application/pdf"
      />
      <button onClick={generateReport}>Generate Report</button>
      {reportUrl && (
        <a href={reportUrl} target="_blank" rel="noopener noreferrer">
          Download Report
        </a>
      )}
    </div>
  );
}
