
export interface Folder {
  id: number;
  name: string;
  createdAt: string;
  files?: PdfFile[];
}

export interface PdfFile {
  id: number;
  name: string;
  path: string;
  uploadedAt: string;
  folderId: number;
}
