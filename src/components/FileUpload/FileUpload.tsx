// FileUpload.tsx
import React, { useState } from "react";

interface Props {
  onUploadSuccess: () => void;
  folderId: number;
}

const FileUpload: React.FC<Props> = ({ onUploadSuccess, folderId }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderId", String(folderId));

    try {
      const res = await fetch("http://localhost:3000/files/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        onUploadSuccess(); // обновляем список после загрузки
        setFile(null);
        alert("Файл успешно загружен");
      } else {
        alert("Ошибка загрузки файла");
      }
    } catch (e) {
      console.error(e);
      alert("Ошибка при загрузке");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload} disabled={!file}>
        Загрузить
      </button>
    </div>
  );
};

export default FileUpload;
