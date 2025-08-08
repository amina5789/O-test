import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.scss";
import { useSelectedFile } from "../../context/SelectedFileContext";

interface FileType {
  id: number;
  name: string;
  uploadedAt: string;
  path: string;
  folder: {
    id: number;
    name: string;
  };
}

interface FolderType {
  id: number;
  name: string;
  files: FileType[];
}

const Sidebar: React.FC<{
  onFoldersUpdate?: (fetchFolders: () => void) => void;
}> = ({ onFoldersUpdate }) => {
  const [viewMode, setViewMode] = useState<"date" | "folder">("date");
  const [folders, setFolders] = useState<FolderType[]>([]);
  const { selectFile } = useSelectedFile();

  const fetchFolders = () => {
    fetch("http://localhost:3000/folders")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFolders(data);
        } else {
          console.error("Ожидался массив папок, но получили:", data);
          setFolders([]);
        }
      })
      .catch((err) => {
        console.error("Ошибка при загрузке папок:", err);
      });
  };

  useEffect(() => {
    fetchFolders();
    if (onFoldersUpdate) onFoldersUpdate(fetchFolders);
  }, []);

  const handleDeleteFile = async (file: FileType) => {
    const confirmed = window.confirm(`Удалить файл "${file.name}"?`);
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/upload/${file.path}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Ошибка при удалении файла");
      }

      fetchFolders();
    } catch (err) {
      console.error("Ошибка при удалении:", err);
      alert("Не удалось удалить файл.");
    }
  };

  const renderFileItem = (file: FileType) => (
    <div key={file.id} className={styles.fileItem}>
      <span
        onClick={() => selectFile({ ...file, folderId: file.folder.id })}
        style={{ cursor: "pointer", flex: 1 }}
      >
        📄 {file.name}
      </span>
      <button
        onClick={() => handleDeleteFile(file)}
        className={styles.deleteButton}
        title="Удалить файл"
      >
        🗑
      </button>
    </div>
  );

  const renderByDate = () => {
    const allFiles = folders.flatMap((folder) => folder.files || []);
    const groupedByDate = allFiles.reduce<Record<string, FileType[]>>(
      (acc, file) => {
        const date = new Date(file.uploadedAt).toLocaleDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(file);
        return acc;
      },
      {}
    );

    return (
      <div className={styles.groupList}>
        {Object.entries(groupedByDate).map(([date, files]) => (
          <div key={date} className={styles.group}>
            <div className={styles.groupTitle}>{date}</div>
            {files.map(renderFileItem)}
          </div>
        ))}
      </div>
    );
  };

  const renderByFolder = () => (
    <div className={styles.groupList}>
      {folders.map((folder) => (
        <div key={folder.id} className={styles.group}>
          <div className={styles.groupTitle}>📁 {folder.name}</div>
          {folder.files?.map(renderFileItem)}
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.sidebar}>
      <div className={styles.toggleButtons}>
        <button
          className={viewMode === "date" ? styles.active : ""}
          onClick={() => setViewMode("date")}
        >
          Дата
        </button>
        <button
          className={viewMode === "folder" ? styles.active : ""}
          onClick={() => setViewMode("folder")}
        >
          Папки
        </button>
      </div>

      <div className={styles.list}>
        {viewMode === "date" ? renderByDate() : renderByFolder()}
      </div>
    </div>
  );
};

export default Sidebar;
