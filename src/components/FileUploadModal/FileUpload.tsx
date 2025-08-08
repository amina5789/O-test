import React, { useState, ChangeEvent } from "react";
import styles from "./FileUploadModal.module.scss";

interface FileUploadModalProps {
  onClose: () => void;
  folderId: string;
  onUploadSuccess?: () => void; // ✅ добавлено
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({
  onUploadSuccess, // ✅ добавили деструктуризацию
  onClose,
  folderId,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !folderId) {
      setErrorMessage("Файл и folderId обязательны");
      return;
    }
    setLoading(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderId", "1");
    try {
      const response = await fetch("http://localhost:3000/files/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || response.statusText);
      }
      const data = await response.json();
      console.log("Ответ от сервера:", data);

      if (typeof onUploadSuccess === "function") {
        onUploadSuccess(); // ✅ добавлено
      }

      setFile(null);
      onClose(); // 🔄 остался
    } catch (error: any) {
      setErrorMessage(error.message || "Ошибка при загрузке файла");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Загрузить файл</h2>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!file || !folderId || loading}>
          {loading ? "Загрузка..." : "Загрузить"}
        </button>
        <button onClick={onClose} disabled={loading}>
          Отмена
        </button>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>
    </div>
  );
};
