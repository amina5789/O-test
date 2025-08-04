import React, { createContext, useContext, useState } from "react";
import { PdfFile } from "../types";

interface SelectedFileContextType {
  selectedFile: PdfFile | null;
  selectFile: (file: PdfFile) => void;
}

const SelectedFileContext = createContext<SelectedFileContextType | undefined>(
  undefined
);

export const SelectedFileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedFile, setSelectedFile] = useState<PdfFile | null>(null);

  const selectFile = (file: PdfFile) => {
    setSelectedFile(file);
  };

  return (
    <SelectedFileContext.Provider value={{ selectedFile, selectFile }}>
      {children}
    </SelectedFileContext.Provider>
  );
};

export const useSelectedFile = () => {
  const context = useContext(SelectedFileContext);
  if (!context)
    throw new Error("useSelectedFile must be used within SelectedFileProvider");
  return context;
};
