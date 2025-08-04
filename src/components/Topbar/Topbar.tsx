import React, { useState } from 'react';
import styles from './Topbar.module.scss';
import {AddFolderModal} from '../AddFolderModal/AddFolderModal';

const Topbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={styles.topbar}>
      <div></div> {/* Можно использовать для логотипа/названия позже */}
      <button className={styles.addButton} onClick={handleOpenModal}>
        Добавить папку
      </button>

      {isModalOpen && <AddFolderModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Topbar;
