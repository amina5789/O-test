import React, { useState } from "react";
import styles from "./PdfViewer.module.scss";
import { Document, Page, pdfjs } from "react-pdf";
import { useSelectedFile } from "../../context/SelectedFileContext";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js`;

const PdfViewer: React.FC = () => {
  const { selectedFile } = useSelectedFile();
  const [numPages, setNumPages] = useState<number | null>(null);

  if (!selectedFile) {
    return (
      <div className={styles.placeholder}>Выберите файл для просмотра</div>
    );
  }

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className={styles.viewer}>
      <h3>{selectedFile.name}</h3>
      <div className={styles.pdfContainer}>
        <Document
          file={`http://localhost:3000/upload/${selectedFile.path}`}
          onLoadSuccess={onDocumentLoadSuccess}
          renderMode="svg"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={1050}
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
