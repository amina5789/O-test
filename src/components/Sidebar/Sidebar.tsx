import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import { mockFolders } from "./mockData";
import { useSelectedFile } from "../../context/SelectedFileContext";

const Sidebar: React.FC = () => {
  const [viewMode, setViewMode] = useState<"date" | "folder">("date");
  const { selectFile } = useSelectedFile();

  const renderByDate = () => {
    const allFiles = mockFolders.flatMap((f) => f.files || []);
    const groupedByDate = allFiles.reduce<Record<string, typeof allFiles>>(
      (acc, file) => {
        if (!acc[file.uploadedAt]) acc[file.uploadedAt] = [];
        acc[file.uploadedAt].push(file);
        return acc;
      },
      {}
    );

    return (
      <div className={styles.groupList}>
        {Object.entries(groupedByDate).map(([date, files]) => (
          <div key={date} className={styles.group}>
            <div className={styles.groupTitle}>{date}</div>
            {files.map((file) => (
              <div
                key={file.id}
                className={styles.fileItem}
                onClick={() => selectFile(file)}
              >
                📄 {file.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderByFolder = () => (
    <div className={styles.groupList}>
      {mockFolders.map((folder) => (
        <div key={folder.id} className={styles.group}>
          <div className={styles.groupTitle}>📁 {folder.name}</div>
          {folder.files?.map((file) => (
            <div
              key={file.id}
              className={styles.fileItem}
              onClick={() => selectFile(file)}
            >
              📄 {file.name}
            </div>
          ))}
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
