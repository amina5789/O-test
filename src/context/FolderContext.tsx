import React, { createContext, useContext, useState } from 'react';
import { PdfFile } from '../types';

interface Folder {
  id: string;
  name: string;
  files?: PdfFile[];
}

interface FolderContextType {
  folders: Folder[];
  addFolder: (name: string) => void;
}

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export const FolderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [folders, setFolders] = useState<Folder[]>([]);

  const addFolder = (name: string) => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      files: [],
    };
    setFolders((prev) => [...prev, newFolder]);
  };

  return (
    <FolderContext.Provider value={{ folders, addFolder }}>
      {children}
    </FolderContext.Provider>
  );
};

export const useFolderContext = () => {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error('useFolderContext must be used within FolderProvider');
  }
  return context;
};
