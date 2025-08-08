import React, { useRef, useState } from "react";
import styles from "./Topbar.module.scss";
import { AddFolderModal } from "../AddFolderModal/AddFolderModal";
import { FileUploadModal } from "../FileUploadModal/FileUpload";

const Topbar: React.FC = () => {
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [folderId, setFolderId] = useState<string>("1");

  const fetchFoldersRef = useRef<() => void>(() => {});

  const handleOpenFileModal = () => setIsFileModalOpen(true);
  const handleCloseFileModal = () => setIsFileModalOpen(false);
  const handleCloseFolderModal = () => setIsFolderModalOpen(false);

  return (
    <div className={styles.topbar}>
      <div></div>
      <button className={styles.addButton} onClick={handleOpenFileModal}>
        Загрузить файл
      </button>

      {isFolderModalOpen && <AddFolderModal onClose={handleCloseFolderModal} />}

      {isFileModalOpen && (
        <FileUploadModal
          onClose={handleCloseFileModal}
          folderId={folderId}
          onUploadSuccess={() => {
            console.log("📣 Вызов fetchFolders после загрузки");
            fetchFoldersRef.current();
          }}
        />
      )}
    </div>
  );
};

export default Topbar;
