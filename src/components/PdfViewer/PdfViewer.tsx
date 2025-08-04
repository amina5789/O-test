import React from "react";
import styles from "./PdfViewer.module.scss";
import { Document, Page, pdfjs } from "react-pdf";
import { useSelectedFile } from "../../context/SelectedFileContext";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PdfViewer: React.FC = () => {
  const { selectedFile } = useSelectedFile();

  if (!selectedFile) {
    return (
      <div className={styles.placeholder}>Выберите файл для просмотра</div>
    );
  }

  return (
    <div className={styles.viewer}>
      <h3>{selectedFile.name}</h3>
      <div className={styles.pdfContainer}>
        <Document file={selectedFile.path}>
          <Page pageNumber={1} />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
