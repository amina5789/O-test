import React, { useState } from 'react';
import styles from './AddFolderModal.module.scss';

interface Props {
  onClose: () => void;
}

export const AddFolderModal: React.FC<Props> = ({ onClose }) => {
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!folderName.trim()) {
      setError('Название папки не может быть пустым');
      return;
    }

    // TODO: отправить POST-запрос на бэкенд
    console.log('Создать папку:', folderName);

    // Сброс
    setError('');
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
    if (error && e.target.value.trim()) {
      setError('');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Новая папка</h2>
        <form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            placeholder="Название папки"
            value={folderName}
            onChange={handleChange}
            className={error ? styles.inputError : ''}
          />
          {error && <p className={styles.errorText}>{error}</p>}
          <div className={styles.actions}>
            <button type="submit" disabled={!folderName.trim()}>Создать</button>
            <button type="button" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};

